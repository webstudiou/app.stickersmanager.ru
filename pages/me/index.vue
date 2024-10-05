<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.me.index.headings.title' },
])

setTitle('pages.me.index.headings.title')

useHead({
  title: useLangs('pages.me.index.headings.title'),
})

const storeAuth = useStoreAuth()
const user = computed(() => storeAuth.user)
// const settings = computed(() => storeAuth.settings)
</script>

<template>
  <app-page scrollable class="bg-backgrounds-primary">
    <app-container>
      <app-page-info title="pages.me.index.pre-headers.personal-info.title">
        <template #description>
          {{ useLangs('pages.me.index.pre-headers.personal-info.description') }}
          <els-link :to="{ name: 'staff-id', params: { id: user.data.id } }" class="font-medium text-labels-primary">
            «{{ useLangs('pages.staff.id.index.headings.title') }}».
          </els-link>
        </template>
      </app-page-info>
    </app-container>
    <app-container>
      <app-page-info title="pages.me.index.pre-headers.billing-address.title" description="pages.me.index.pre-headers.billing-address.description" />
    </app-container>
    <app-container>
      <app-page-info title="pages.me.index.pre-headers.others.title" description="pages.me.index.pre-headers.others.description" />
    </app-container>
  </app-page>
</template>
