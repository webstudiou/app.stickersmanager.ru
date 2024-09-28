<script setup lang="ts">

</script>

<template>
  <app-page class="bg-gray-6">
    <div class="relative flex flex-col flex-auto overflow-hidden">
      <sticker-browser-header>
        none
      </sticker-browser-header>
      <sticker-browser-filters />
      <div class="relative grid grid-rows-[max-content_1fr] h-full overflow-auto bg-backgrounds-primary">
        <sticker-browser-default-header />
        <div class="">
          <div class="">
            body
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>
