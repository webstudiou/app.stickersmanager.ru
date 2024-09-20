import type { IFetchError } from 'ofetch'

export const useErrorHandler = (e: IFetchError) => {
  // const toast = useToast()

  switch (e.statusCode) {
    case 401: {
      // const authStore = AuthStore()
      // await authStore.signout()
      break
    }
    default: {
      throw createError({
        statusCode: e.statusCode,
        statusMessage: e.statusMessage,
        name: `errors.${e.statusCode}.title`,
        message: `errors.${e.statusCode}.description`,
      })
    }
  }
}
