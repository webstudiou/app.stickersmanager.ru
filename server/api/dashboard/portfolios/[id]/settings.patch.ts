import type { EventHandlerRequest, H3Event } from 'h3'
import bearer from '~/server/utils/bearer'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Portfolios.D_NavigatorItem> => {
  const { id } = getRouterParams(e)
  const body = await readBody(e)
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiURL}/api/dashboard/portfolios/${id}/settings`, {
    method: 'PATCH',
    body: body,
    headers: { ...(await bearer(e)) },
  })
})
