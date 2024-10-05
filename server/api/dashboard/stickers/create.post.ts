import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Stickers.D_BrowserDefaultItem> => {
  const body = await readBody(e)
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiURL}/api/dashboard/stickers/create`, {
    method: 'POST',
    body: body,
    headers: { ...(await bearer(e)) },
  })
})
