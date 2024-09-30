export async function redirect(path?: string) {
  const callbackUrl = `/${path || 'init'}?callbackUrl=${window.location.href}`

  if (callbackUrl.startsWith('http')) {
    location.href = callbackUrl
    return
  }

  const router = useRouter()
  await router.push(callbackUrl)
}
