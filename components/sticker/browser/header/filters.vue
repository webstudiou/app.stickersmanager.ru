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
  <div class="grid grid-cols-[1fr_max-content] gap-2.5 items-center flex-auto px-2.5 pt-0">
    <div class="grid grid-cols-[max-content_1fr_max-content_max-content] items-center gap-1.5 min-w-[250px] overflow-hidden bg-backgrounds-primary rounded-md h-md px-1.5">
      <div class="flex flex-center ml-1">
        <els-icon name="filters" class="overflow-hidden text-muted" :size="ui.size" />
      </div>
      <div class="text-muted">
        Filters placeholder
      </div>
      <!--      <div class="grid grid-flow-col auto-cols-max gap-1.5 overflow-hidden text-sm items-center">
        <div v-for="(filter, key) in storeProjects.filters" :key="key" class="grid grid-flow-col auto-cols-max gap-1.5 items-center cursor-pointer rounded-sm bg-gray-6 px-[8px] select-none">
          <div>
            {{ key }}
          </div>
          <div class="relative grid grid-flow-col auto-cols-max gap-1.5 items-center py-0.5">
            <div class="flex items-center overflow-hidden cursor-pointer rounded-xs px-[4px] py-[3px] bg-backgrounds-secondary">
              <span class="block truncate max-w-[150px]">
                {{ filter }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-[max-content_1fr] gap-1.5 items-center h-full transition-colors rounded-sm bg-gray-6 px-[8px]">
          <els-icon name="plus" class="overflow-hidden" :size="ui.icons['sm']" />
          <div>
            Add
          </div>
        </div>
      </div> -->

      <div class="flex flex-center">
        <els-icon
          name="expand"
          class="overflow-hidden text-muted hover:text-labels-primary cursor-pointer transition-colors"
          :size="ui.size"
          @click="toggle = !toggle"
        />
      </div>
    </div>
    <sticker-browser-header-sorts />
  </div>
</template>

<script lang="ts">
type Props = {
  modelValue?: boolean
}
</script>
