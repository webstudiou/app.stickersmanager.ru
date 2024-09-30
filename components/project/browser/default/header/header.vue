<script setup lang="ts">
import { useStoreProjects } from '~/stores'
import { useCoreStates } from '~/composables'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void
}>()

const { ui } = useCore('project-browser-default-header', null, basis, undefined, true)

const toggle = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:model-value', value)
  },
})

const datasets = reactive({
  search: '',
})

const storeProjects = useStoreProjects()
const { isBrowserProjectModalOpened, isBrowserFolderModalOpened } = useCoreStates()
</script>

<template>
  <div class="static flex-none justify-between grid grid-cols-[1fr_max-content] z-[initial] p-2.5 pt-0 gap-2.5">
    <div class="grid grid-cols-[250px_1fr] items-center gap-2.5">
      <els-input-search
        v-model="datasets.search"
        title="models.search.title"
        :title-fixed="false"
        fluid
        :ui="{ bg: 'bg-backgrounds-primary' }"
      />
      <div class="grid grid-cols-[max-content_1fr_max-content_max-content] items-center gap-1.5 min-w-[250px] overflow-hidden bg-backgrounds-primary rounded h-full px-1.5">
        <div class="flex flex-center ml-1">
          <els-icon name="filters" class="overflow-hidden text-muted" :size="ui.icons['md']" />
        </div>
        <div class="grid grid-flow-col auto-cols-max gap-1.5 overflow-hidden text-sm items-center">
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
        </div>

        <div class="flex flex-center">
          <els-icon
            name="expand"
            class="overflow-hidden text-muted hover:text-labels-primary cursor-pointer transition-colors"
            :size="ui.icons['md']"
            @click="toggle = !toggle"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2.5">
      <els-button title="buttons.add.project.title" @click="isBrowserProjectModalOpened = true" />
      <els-button title="buttons.add.folder.title" variant="bezeled" @click="isBrowserFolderModalOpened = true" />
    </div>
  </div>
</template>

<script lang="ts">
import { useCore } from '#imports'
import { basis } from '#app-ui/configs'

type Props = {
  modelValue?: boolean
}
</script>
