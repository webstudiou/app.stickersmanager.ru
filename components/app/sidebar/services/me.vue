<script setup lang="ts">
const router = useRouter()
const location = computed(() => String(router.currentRoute.value.name))

const links = [
  {
    key: 'me',
    disabled: false,
  },
  {
    key: 'appearances',
    disabled: true,
  },
  {
    key: 'notifications',
    disabled: true,
  },
  {
    key: 'security',
    disabled: true,
  },
  {
    key: 'integrations',
    disabled: true,
  },
]
</script>

<template>
  <div class="tablet:m-2.5 mt-0">
    <els-menu :active-id="location" router>
      <els-menu-header title="pages.me.index.headings.root" />
      <els-menu-item
        v-for="link in links"
        :id="link.key === 'me' ? link.key : `me-${link.key}`"
        :key="link.key"
        :title="link.key === 'me' ? 'pages.me.index.headings.title' : `pages.me.${link.key}.index.headings.title`"
        :icon="link.key"
        :route="{ name: link.key === 'me' ? link.key : `me-${link.key}` }"
        :disabled="link.disabled"
      />
    </els-menu>
  </div>
</template>
