<script setup lang="ts">
import { useAppConfig } from '#imports'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void
}>()

const { ui } = useAppConfig()

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
    <!--    z-index: 11; -->
    <div class="flex items-center flex-auto h-full">
      <div class="flex flex-auto items-center h-full">
        <sticker-browser-header-viewers />
        <sticker-browser-header-filters v-model="toggle" />
      </div>
    </div>
    <div class="flex items-center flex-none h-full justify-end gap-2.5">
      <div class="flex items-center h-full">
        <els-button title="buttons.share.title" variant="bezeled" :size="ui.size" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  modelValue?: boolean
}
</script>
