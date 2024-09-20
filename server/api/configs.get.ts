export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiURL}/api/config`)
})
