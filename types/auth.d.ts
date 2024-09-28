declare global {
  namespace Auths {
    interface Me {
      name: string
      image: Avatar | null
    }

        type D_Me = api.MetApiResponse<{ data: Me }>

        interface Token {
          access_token: string
          token_type: string
          expires_in: string
          refresh_token: string
        }

      type D_Token = api.MetApiResponse<{ data: Token }>
  }
}

export {}
