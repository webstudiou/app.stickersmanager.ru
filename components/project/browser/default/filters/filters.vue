<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
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
    <div v-if="toggle" class="grid auto-rows-max gap-1.5 p-2.5 overflow-x-auto bg-backgrounds-primary rounded m-2.5 mt-0">
      <div class="grid grid-flow-col auto-cols-max gap-1.5 items-center rounded-sm bg-gray-6 px-[8px] py-[4px] cursor-pointer">
        <div>
          Projects:
        </div>
        <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center h-full">
          <div class="flex items-center overflow-hidden cursor-pointer rounded-xs p-[4px] bg-backgrounds-secondary text-sm">
            <span class="block truncate max-w-[150px]">
              All
            </span>
          </div>
        </div>
      </div>
    </div>
  </els-transition-collapse>
</template>

<script lang="ts">
type Props = {
  modelValue?: boolean
}
</script>
