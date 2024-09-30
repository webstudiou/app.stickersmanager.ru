import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Dashboards.D_NavigatorItems> => {
  const runtimeConfig = useRuntimeConfig()

  return await $fetch(`${runtimeConfig.public.apiURL}/api/dashboard/init`, {
    headers: { ...(await bearer(e)) },
  })
})
