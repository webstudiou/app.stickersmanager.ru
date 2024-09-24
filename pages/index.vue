<script setup lang="ts">
const { setCrumbs, setTitle } = useCrumbs()
// const toast = useToast()

const route = useRoute()
// const query = route.query as InviteRouteParams

setCrumbs([])
setTitle('pages.sign-in.index.headings.title')

useHead({
  title: useLangs('pages.sign-in.index.headings.title'),
})

definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/init',
  },
})

const datasets = reactive({
  slide: 0,
  name: '',
  image: '',
  username: 'info@wstudiou.ru',
  password: 'Jura!2406',
})

// const invitation = ref()
const { ui } = useCore('auth-slide', null, config)
const slideWrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper)))

async function handleSignMe() {
  await $fetch('/api/sign-me', {
    method: 'POST',
    body: {
      username: datasets.username,
    },
  })
    .then(({ data }) => {
      datasets.name = data.name
      datasets.image = data.image?.xxl || '/images/defaults/avatar.png'
      datasets.slide++
    })
    .catch(e => useErrorHandler(e))
}

async function handleSignIn() {
  const { signIn } = useAuth()
  await signIn('credentials', { username: datasets.username, password: datasets.password, redirect: false })
    .then(async () => {
      const nextUrl: any = route.query?.next || route.query?.callbackUrl
      const callbackUrl = nextUrl ? `/init?callbackUrl=${nextUrl}` : '/init'

      if (callbackUrl.startsWith('http')) {
        location.href = callbackUrl
        return
      }

      const router = useRouter()
      await router.push(callbackUrl)
    })
    .catch(e => useErrorHandler(e))
}

onMounted(async () => {
  /* if (!query.id && query.code && query.entity) {
    await $fetch('/api/teams/invitations', {
      query: {
        id: query.id,
        code: query.code,
        entity: query.entity
      }
    })
  } */
  datasets.slide = 1
})
</script>

<template>
  <transition
    mode="out-in"
    appear
    :duration="250"
    v-bind="ui.transition"
  >
    <div v-if="datasets.slide === 1" :class="slideWrapperClass">
      <auth-header to="/" />
      <auth-title title="pages.sign-in.index.pre-headers.1.title" description="pages.sign-in.index.pre-headers.1.description" />
      <ElsForm v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 tablet:gap-5" @submit="handleSignMe">
        <els-input-text
          v-model="datasets.username"
          name="username"
          title="models.email.title"
          autofocus
          fluid
          rules="required|email"
          left-icon="email"
          :disabled="isSubmitting"
        />
        <els-button
          :disabled="!meta.valid"
          :loading="isSubmitting"
          title="buttons.next.title"
          fluid
          type="submit"
        />
      </ElsForm>
      <auth-links question="pages.sign-in.index.links.sign-up.title" answer="pages.sign-in.index.links.sign-up.link" :to="{ name: 'sign-up' }" />
    </div>
    <div v-else-if="datasets.slide === 2" :class="slideWrapperClass">
      <auth-header to="/">
        <els-avatar size="2xl" :alt="datasets.name" :src="datasets.image" />
      </auth-header>
      <auth-title :title="useLangs('pages.sign-in.index.pre-headers.2.title', { name: datasets.name })" description="pages.sign-in.index.pre-headers.2.description" />

      <els-form v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 tablet:gap-5" @submit="handleSignIn">
        <els-input-text
          v-model="datasets.password"
          type="password"
          name="password"
          title="models.password.title"
          autofocus
          fluid
          rules="required|password"
          left-icon="password"
          :disabled="isSubmitting"
        />
        <els-button
          :disabled="!meta.valid"
          :loading="isSubmitting"
          title="buttons.sign-in.title"
          fluid
          type="submit"
        />
      </els-form>

      <auth-links question="pages.sign-in.index.links.recover.title" answer="pages.sign-in.index.links.recover.link" :to="{ name: 'sign-res' }" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Form as ElsForm } from 'vee-validate'
import { twJoin, twMerge, mergeConfig } from '#app-ui/utils'
import { useCore, useLangs, useAuth } from '#imports'
import { useCrumbs } from '~/composables'
// @ts-expect-error
import appConfig from '#build/app.config'

const el = {
  wrapper: 'bg-backgrounds-primary dark:bg-backgrounds-secondary p-5 tablet:p-10 rounded-[25px] w-full tablet:w-[500px]',
  transition: {
    enterClass: 'ease-out',
    enterFromClass: 'opacity-0',
    enterToClass: 'opacity-100',
    leaveClass: 'ease-in',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },
}
export const config = mergeConfig<typeof el>(appConfig.ui.strategy, {}, el)
</script>
