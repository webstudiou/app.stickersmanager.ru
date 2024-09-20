declare global {
  namespace Auths {
    interface Me {
      name: string
      image: Avatar | null
    }
      type D_Me = api.MetApiResponse<{ data: Me }>
  }
}

export {}
