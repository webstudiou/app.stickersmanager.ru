import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

type TOKEN = {
  access_token: string
  token_type: string
  expires_in: string
  refresh_token: string
}

export default NuxtAuthHandler({
  secret: process.env.APP_SECRET as string,
  pages: {
    signIn: '/',
  },
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: '', type: 'text' },
        password: { label: '', type: 'password' },
      },
      authorize: async function (credentials: { username: string, password: string }) {
        try {
          const token = await $fetch<{ data: TOKEN }>(`${process.env.SRV_URL}/api/sign-in`, {
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
            image: profile.data.data.attributes.image,
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
        return refresh(token as TOKEN)
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

async function refresh(token: TOKEN) {
  try {
    const refreshed = await $fetch<{ data: TOKEN }>(`${process.env.APP_URL}/api/sign-in/refresh-token`, {
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
