import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Stickers.D_BrowserDefaultItems> => {
  const runtimeConfig = useRuntimeConfig()

  return await $fetch(`${runtimeConfig.public.apiURL}/api/dashboard/stickers`, {
    headers: { ...(await bearer(e)) },
  })
})
