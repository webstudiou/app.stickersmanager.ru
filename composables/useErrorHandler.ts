import type { IFetchError } from 'ofetch'
import { useToast } from '#app-ui/composables'
import { useStoreAuth } from '~/stores'

export const useErrorHandler = async (e: IFetchError) => {
  const toast = useToast()

  switch (e.statusCode) {
    case 401: {
      const storeAuth = useStoreAuth()
      await storeAuth.signout()
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
