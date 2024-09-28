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
  <div class="relative flex justify-between flex-none p-2.5">
    <!--    z-index: 11;
    height: 60px; -->
    <div class="flex items-center flex-auto h-full bg-danger" @click="toggle = !toggle">
      <slot />
      1
    </div>
    <div class="flex items-center flex-none h-full justify-end gap-2.5 bg-yellow">
      <slot name="trailing" />
      2
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  modelValue?: boolean
}
</script>
