<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useStoreStickers } from '#imports'

const storeStickers = useStoreStickers()

const style = (key: string) => {
  return {
    width: `${storeStickers.columns.find(i => i.key === key).width}px`,
    minWidth: `${storeStickers.columns.find(i => i.key === key).minWidth}px`,
  } as CSSProperties
}

const visible = (key: string) => storeStickers.columns.find(i => i.key === key).visible
</script>

<template>
  <div class="group/row relative flex items-center h-[--row-min-height] transition-all cursor-pointer gap-1.5 border-y border-b-backgrounds-secondary border-t-transparent hover:border-b-gray-2 hover:before:border-t-gray-2 will-change-scroll before:transition-all before:-mx-px before:border-t before:border-t-transparent before:w-full before:block before:left-0 before:right-0 before:-top-[2px] before:absolute select-none" @click="storeStickers.entry=undefined">
    <slot name="title" :title-style="style('title')" />

    <div v-if="visible('id')" class="group-hover/row:bg-red">
      <slot name="id" :id-style="style('id')" />
    </div>
    <div v-if="visible('project')" class="flex items-center contain-content overflow-hidden gap-1.5 group-hover/row:bg-red" :style="style('project')">
      <slot name="project" />
    </div>
    <div v-if="visible('board')" class="flex items-center contain-content overflow-hidden gap-1.5 group-hover/row:bg-red" :style="style('board')">
      <slot name="board" />
    </div>
    <div v-if="visible('column')" class="flex items-center contain-content overflow-hidden gap-1.5 group-hover/row:bg-red" :style="style('column')">
      <slot name="column" />
    </div>
    <div v-if="visible('executor')" class="relative flex items-center justify-start overflow-hidden truncate transition-none group-hover/row:bg-red" :style="style('executor')">
      <slot name="executor" />
    </div>
    <div v-if="visible('dates')" class="relative group-hover/row:bg-red" :style="style('dates')">
      <slot name="dates" />
    </div>
    <div v-if="visible('priority')" class="group-hover/row:bg-red" :style="style('priority')">
      <slot name="priority" />
    </div>
    <div v-if="visible('tags')" class="overflow-hidden contain-content group-hover/row:bg-red" :style="style('tags')">
      <slot name="tags" />
    </div>
    <div class="flex items-center contain-content gap-1.5 justify-end ml-auto mr-2.5 group-hover/row:bg-red">
      <slot name="actions" />
    </div>
  </div>
</template>
