<script setup lang="ts">
const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))
</script>

<template>
  <div class="tablet:m-2.5 mt-0" />
</template>
