import CredentialsProvider from 'next-auth/providers/credentials'
import YandexProvider from 'next-auth/providers/yandex'
import type { YandexProfile } from 'next-auth/providers/yandex'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.APP_SECRET as string,
  pages: {
    signIn: '/',
  },
  providers: [
    // @ts-expect-error
    YandexProvider.default({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      async profile(profile: YandexProfile) {
        const token = await $fetch<{ data: Auths.Token }>(`${process.env.SRV_URL}/api/oauth/init`, {
          query: {
            username: profile.default_email ?? profile.emails?.[0] ?? null,
            name: profile.display_name,
            provider: 'yandex',
            image: !profile.is_avatar_empty && profile.default_avatar_id ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200` : null,
          },
        })

        const server_profile = await $fetch<Users.D_User>(`${process.env.SRV_URL}/api/me/init`, {
          method: 'GET',
          headers: {
            Authorization: `${token?.data?.token_type} ${token?.data?.access_token}`,
          },
        })

        return {
          id: server_profile.data.data.id,
          email: server_profile.data.data.attributes.email,
          name: server_profile.data.data.attributes.name,
          image: server_profile.data.data.relationships.settings.data.attributes.image,
          access_token: token.data.access_token,
          token_type: token.data.token_type,
          expires_in: token.data.expires_in,
          refresh_token: token.data.refresh_token,
          provider: 'yandex',
        }
      },
    }),
    {
      id: 'kinostore',
      name: 'kinostore',
      type: 'oauth',
      version: '2.0',
      clientId: process.env.KINOSTORE_CLIENT_ID,
      clientSecret: process.env.KINOSTORE_CLIENT_SECRET,
      authorization: {
        url: 'http://localhost:3001/oauth/authorize',
        params: {
          scope: '*',
        },
      },
      token: 'https://oauth.yandex.ru/token',
      userinfo: 'https://login.yandex.ru/info?format=json',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name ?? profile.real_name ?? profile.first_name,
          email: profile.default_email ?? profile.emails?.[0] ?? null,
          image:
              !profile.is_avatar_empty && profile.default_avatar_id
                ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
                : null,
        }
      },
      idToken: true,
    },
    // @ts-ignore
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: '', type: 'text' },
        password: { label: '', type: 'password' },
      },
      authorize: async function (credentials: { username: string, password: string }) {
        try {
          const token = await $fetch<Auths.D_Token>(`${process.env.SRV_URL}/api/sign-in`, {
            method: 'POST',
            body: {
              username: credentials.username,
              password: credentials.password,
            },
          })

          const profile = await $fetch<Users.D_User>(`${process.env.SRV_URL}/api/me/init`, {
            method: 'GET',
            headers: {
              Authorization: `${token?.data?.token_type} ${token?.data?.access_token}`,
            },
          })

          if (!token || !token.data || !profile) throw createError({
            statusCode: 500,
            statusMessage: 'Next auth failed',
          })

          return {
            id: profile.data.data.id,
            email: profile.data.data.attributes.email,
            name: profile.data.data.attributes.name,
            image: profile.data.data.relationships.settings.data.attributes.image,
            access_token: token.data.access_token,
            token_type: token.data.token_type,
            expires_in: token.data.expires_in,
            refresh_token: token.data.refresh_token,
            provider: null,
          }
        }
        catch (e) {
          throw createError({
            statusCode: 500,
            statusMessage: String(e),
          })
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        }
      }

      if ((new Date(token.expires_in as string).getTime() - new Date().getTime()) < 50000) {
        return refresh(token as Auths.Token)
      }

      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      }

      session.expires = session.user.expires_in

      return session
    },
  },
})

async function refresh(token: Auths.Token) {
  try {
    const refreshed = await $fetch<{ data: Auths.Token }>(`${process.env.APP_URL}/api/sign-in/refresh-token`, {
      method: 'POST',
      body: {
        refresh_token: token.refresh_token,
      },
    })

    // @ts-ignore
    if (!refreshed || !refreshed.data) {
      throw refreshed
    }

    return {
      ...token,
      access_token: refreshed.data.access_token,
      expires_in: refreshed.data.expires_in,
      refresh_token: refreshed.data.refresh_token,
    }
  }
  catch (e) {
    return {
      ...token,
      error: e,
    }
  }
}
