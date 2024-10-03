import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<api.MetApiResponse> => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(e)

  return await $fetch(`${runtimeConfig.public.apiURL}/api/subscription/tariff/scale`, {
    headers: { ...(await bearer(e)) },
    method: 'POST',
    body: body,
  })
})
