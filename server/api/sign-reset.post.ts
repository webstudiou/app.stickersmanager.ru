import type { EventHandlerRequest, H3Event } from 'h3'

export default defineEventHandler(async (e: H3Event<EventHandlerRequest>): Promise<Auths.D_Me> => {
  const body = await readBody(e)
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiURL}/api/sign-reset`, {
    method: 'POST',
    body: body,
  })
})
