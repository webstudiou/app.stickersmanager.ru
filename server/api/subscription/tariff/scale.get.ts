import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Subscriptions.D_TariffCalculator> => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(e)

  return await $fetch(`${runtimeConfig.public.apiURL}/api/subscription/tariff/scale`, {
    headers: { ...(await bearer(e)) },
    query: query,
  })
})
