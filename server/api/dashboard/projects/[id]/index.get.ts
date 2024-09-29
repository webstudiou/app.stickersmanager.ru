import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Projects.D_Project> => {
  const { id } = getRouterParams(e)
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiURL}/api/dashboard/projects/${id}`, {
    headers: { ...(await bearer(e)) },
  })
})
