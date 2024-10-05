<script setup lang="ts">
import { useCoreStates } from '#imports'

const { isBrowserProjectModalOpened } = useCoreStates()
</script>

<template>
  <div class="relative flex flex-col flex-auto overflow-hidden">
    <div class="flex flex-col flex-auto flex-center overflow-hidden bg-backgrounds-primary select-none">
      <div class="flex flex-col w-full space-y-2.5 flex-center leading-none">
        <h1 class="text-title2 font-semibold">
          {{ useLangs('pages.dashboard.projects.index.headings.title') }}
        </h1>
        <p>
          {{ useLangs('pages.dashboard.portfolios.navigator.empty.description') }}
        </p>
        <els-button left-icon="plus" title="buttons.add.project.title" @click="isBrowserProjectModalOpened = true" />
        <un-lazy-image src="/images/defaults/cover.svg" class="block w-10/12 object-cover h-[500px] rounded-md" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
