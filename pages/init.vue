<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useStoreAuth, useStoreDashboard } from '~/stores'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([])
setTitle('pages.init.index.headings.title')

useHead({
  title: useLangs('pages.init.index.headings.title'),
})

definePageMeta({
  layout: 'auth',
})

const storeAuth = useStoreAuth()
const storeDashboard = useStoreDashboard()
const loading = computed(() => storeAuth.loading || storeDashboard.loading)

watch(loading, async (loadingState) => {
  if (!loadingState) {
    const router = useRouter()
    const route = useRoute()

    const nextUrl: any = route.query?.next || route.query?.callbackUrl
    const callbackUrl = nextUrl || '/dashboard'

    if (callbackUrl.startsWith('http')) {
      location.href = callbackUrl
      return
    }

    await router.push(callbackUrl)
  }
})

onMounted(async () => {
  await storeAuth.init()
  await storeDashboard.init()
})
</script>

<template>
  <div class="flex flex-col flex-center">
    <els-spinner />
    <p class="text-callout text-labels-primary/75 uppercase font-semibold">
      {{ useLangs('pages.init.index.headings.title') }}
    </p>
  </div>
</template>
