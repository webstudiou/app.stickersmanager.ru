<script setup lang="ts">
import dayjs from 'dayjs'
import { useDates } from '~/composables/useDates'

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits<{
  (e: 'update:model-value', value: number): void
}>()

const t = computed(() => useDates(dayjs().add(props.modelValue, 'day')).date)

const date = computed({
  get: () => {
    return props.modelValue
  },
  set: (newDate) => {
    emits('update:model-value', newDate)
  },
})
</script>

<template>
  <div>
    <div>
      <button @click="date--">
        -
      </button>
    </div>
    <div>
      {{ t }}
    </div>
    <div>
      <button @click="date++">
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  modelValue: number
}
</script>
