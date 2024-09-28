<script setup lang="ts">
const { list, title } = useCrumbs()
</script>

<template>
  <div class="text-footnote leading-none overflow-hidden select-none">
    <div
      v-if="title"
      class="truncate text-headline font-medium leading-none mb-1"
    >
      <span>
        {{ useLangs(title) }}
      </span>
    </div>
    <nav class="flex justify-between text-fonts-secondary">
      <ol class="flex items-center space-x-1 overflow-hidden">
        <li
          key="home"
          class="truncate font-light"
        >
          <router-link :to="{ name: 'dashboard' }">
            <span class="truncate">
              {{ useLangs('pages.dashboard.index.headings.title') }}
            </span>
          </router-link>
        </li>
        <li
          v-for="crumb in list"
          :key="crumb.name"
          class="truncate font-light"
        >
          <div
            v-if="crumb"
            class="flex items-center"
          >
            <els-icon
              name="chevron-right"
              size="10"
            />
            <router-link
              v-if="crumb && crumb.to"
              :to="{ name: crumb.to, params: { ...crumb?.params } }"
              class="ml-1 overflow-hidden"
            >
              <div class="flex items-center">
                <span class="truncate"> {{ useLangs(crumb.name) }} </span>
              </div>
            </router-link>
            <div
              v-else
              class="ml-1 overflow-hidden"
            >
              <div class="flex items-center text-primary">
                <span class="truncate"> {{ useLangs(crumb.name) }} </span>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
