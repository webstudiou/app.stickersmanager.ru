import type { H3Event, EventHandlerRequest } from 'h3'
import { getServerSession } from '#auth'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Record<string, string>> => {
  // @ts-ignore
  const session = await getServerSession(e)

  return { Authorization: `${session?.user?.token_type} ${session?.user?.access_token}` }
})
