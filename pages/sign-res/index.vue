<script setup lang="ts">
const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([])
setTitle('pages.sign-res.index.headings.title')

useHead({
  title: useLangs('pages.sign-res.index.headings.title'),
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
  password: '',
  confirm: '',
})

const { ui } = useCore('auth-slide', null, config)
const slideWrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper)))

async function handleSignRes() {
  await $fetch('/api/sign-reset', {
    method: 'POST',
    body: {
      username: datasets.username,
    },
  })
    .then(({ data }) => {
      datasets.name = data.name
      datasets.image = data.image?.xxl || '/images/defaults/avatar.png'
      datasets.slide = 2
    })
    .catch(e => useErrorHandler(e))
}

async function handleSetNewPassword() {
  await $fetch('/api/sign-reset', {
    method: 'POST',
    body: {
      username: datasets.username,
    },
  })
    .then(({ data }) => {
      datasets.name = data.name
      datasets.image = data.image?.xxl || '/images/defaults/avatar.png'
      datasets.slide = 2
    })
    .catch(e => useErrorHandler(e))
}

onMounted(async () => {
  datasets.slide = 5
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
      <auth-title title="pages.sign-res.index.pre-headers.1.title" description="pages.sign-res.index.pre-headers.1.description" />
      <ElsForm v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 tablet:gap-5" @submit="handleSignRes">
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
      <auth-links question="pages.sign-res.index.links.sign-in.title" answer="pages.sign-res.index.links.sign-in.link" :to="{ name: 'index' }" />
    </div>
    <div v-else-if="datasets.slide === 2" :class="slideWrapperClass">
      <auth-header to="/">
        <els-avatar size="2xl" :alt="datasets.name" :src="datasets.image" />
      </auth-header>
      <auth-title :title="useLangs('pages.sign-res.index.pre-headers.2.title', { name: datasets.name })" description="pages.sign-res.index.pre-headers.2.description" />
      <div class="flex flex-col gap-2.5 tablet:gap-5">
        <els-button title="buttons.next.title" fluid type="submit" />
      </div>
      <auth-links question="pages.sign-res.index.links.sign-in.title" answer="pages.sign-res.index.links.sign-in.link" :to="{ name: 'index' }" />
    </div>
    <div v-else-if="datasets.slide === 3" :class="slideWrapperClass">
      <auth-header to="/">
        <els-avatar size="2xl" :alt="datasets.name" :src="datasets.image" />
      </auth-header>
      <auth-title :title="useLangs('pages.sign-res.index.pre-headers.2.title', { name: datasets.name })" description="pages.sign-res.index.pre-headers.2.description" />
      <div class="flex flex-col gap-2.5 tablet:gap-5">
        <els-button title="buttons.next.title" fluid type="submit" />
      </div>
      <auth-links question="pages.sign-res.index.links.sign-in.title" answer="pages.sign-res.index.links.sign-in.link" :to="{ name: 'index' }" />
    </div>
    <div v-else-if="datasets.slide === 4" :class="slideWrapperClass">
      <auth-header to="/">
        <els-avatar size="2xl" :alt="datasets.name" :src="datasets.image" />
      </auth-header>
      <auth-title :title="useLangs('pages.sign-in.index.pre-headers.5.title', { name: datasets.name })" description="pages.sign-in.index.pre-headers.5.description" />

      <els-form v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 tablet:gap-5" @submit="handleSetNewPassword">
        <els-input-text
          v-model="datasets.password"
          type="password"
          name="password"
          title="models.password-new.title"
          autofocus
          fluid
          rules="required|password"
          left-icon="password"
          :disabled="isSubmitting"
        />

        <els-input-text
          v-model="datasets.confirm"
          type="password"
          name="confirm"
          title="models.password-new-confirm.title"
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

      <auth-links question="pages.sign-res.index.links.sign-in.title" answer="pages.sign-res.index.links.sign-in.link" :to="{ name: 'index' }" />
    </div>
    <div v-else-if="datasets.slide === 5" :class="slideWrapperClass">
      <auth-header to="/">
        <els-avatar size="2xl" :alt="datasets.name" :src="datasets.image" />
      </auth-header>
      <auth-title :title="useLangs('pages.sign-res.index.pre-headers.2.title', { name: datasets.name })" description="pages.sign-res.index.pre-headers.2.description" />
      <div class="flex flex-col gap-2.5 tablet:gap-5">
        <els-button title="buttons.next.title" fluid type="submit" />
      </div>
      <auth-links question="pages.sign-res.index.links.sign-in.title" answer="pages.sign-res.index.links.sign-in.link" :to="{ name: 'index' }" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Form as ElsForm } from 'vee-validate'
import { config } from '../index.vue'
import { twJoin, twMerge } from '#app-ui/utils'
import { useCore, useLangs } from '#imports'
import { useCrumbs } from '~/composables'
</script>
