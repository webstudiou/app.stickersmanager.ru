<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void
}>()

const toggle = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:model-value', value)
  },
})
</script>

<template>
  <els-transition-collapse>
    <div v-if="toggle" class="grid auto-rows-max gap-1.5 p-1.5 bg-backgrounds-primary rounded-sm mx-2.5 mb-2.5">
      <!--      overflow-x-auto -->
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] h-sm cursor-pointer">
        <div>
          Stickers:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-xs">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end h-sm">
        <els-button size="sm" title="add" />
      </div>
    </div>
  </els-transition-collapse>
</template>

<script lang="ts">
type Props = {
  modelValue?: boolean
}
</script>
