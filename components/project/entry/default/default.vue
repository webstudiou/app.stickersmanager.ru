<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col flex-auto overflow-hidden">
    <project-entry-default-header />

    <div class="relative flex flex-auto overflow-hidden">
      <div class="flex flex-col flex-auto overflow-x-hidden overflow-y-auto pb-2.5 bg-backgrounds-primary">
        <div class="relative w-full min-h-[250px] group">
          <un-lazy-image src="/images/defaults/cover.svg" class="block w-full object-cover h-[250px]" />
          <div class="absolute top-0 pointer-events-none opacity-0 flex items-center gap-2.5 right-0 transition-all group-hover:opacity-100 group-hover:pointer-events-auto p-2.5">
            <els-button icon="edit" disabled />
            <els-button icon="delete" color="danger" disabled />
          </div>
        </div>
        <div class="flex flex-col w-full mx-2.5 my-0">
          <div class="flex justify-between items-end">
            <div class="flex items-end gap-2.5">
              <div class="relative w-max -mt-[67px]">
                <els-avatar
                  size="3xl"
                  :src="'/images/defaults/avatar.png'"
                />
              </div>
              <div class="flex items-center gap-1.5">
                <els-button icon="star" variant="bezeled" />
              </div>
            </div>
            <div class="flex items-end gap-2.5">
              d
            </div>
          </div>
          <div class="flex items-center mt-2.5 gap-1.5">
            g
          </div>
          <div class="flex items-center mb-2.5 gap-1.5">
            g
          </div>
          <div class="mt-2.5">
            margin: 20px 0;
          </div>
          <div class="mt-2.5">
            argin: 20px 0;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
