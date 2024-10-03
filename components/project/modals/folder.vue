<script setup lang="ts">
import { Form as ElsForm } from 'vee-validate'
import { useCoreStates, useErrorHandler } from '~/composables'
import { useStoreProjects } from '~/stores'

const props = withDefaults(defineProps<Props>(), {
  folder: undefined,
})

const storeProjects = useStoreProjects()
const { isBrowserFolderModalOpened } = useCoreStates()

const fields = reactive({
  title: '',
})
async function handleCreate() {
  await $fetch('/api/dashboard/portfolios/create', {
    method: 'POST',
    body: {
      title: fields.title,
    },
  })
    .then(({ data }) => {
      storeProjects.entries.unshift(data)
      isBrowserFolderModalOpened.value = false
      fields.title = ''
    })
    .catch(e => useErrorHandler(e))
}

async function handleUpdate() {
  await $fetch(`/api/dashboard/portfolios/${props.folder.id}/settings`, {
    method: 'PATCH',
    body: {
      name: 'title',
      value: fields.title,
    },
  })
    .then(({ data }) => {
      isBrowserFolderModalOpened.value = false
      fields.title = ''
    })
    .catch(e => useErrorHandler(e))
}

async function handle() {
  if (props.folder) {
    await handleUpdate()
  }
  else {
    await handleCreate()
  }
}

onMounted(() => {
  if (!props.folder) return

  fields.title = props.folder.title
})
</script>

<template>
  <app-modal
    v-model="isBrowserFolderModalOpened"
    :title="`pages.dashboard.portfolios.modals.${folder ? 'edit' : 'create'}.headings.title`"
    :description="`pages.dashboard.portfolios.modals.${folder ? 'edit' : 'create'}.headings.description`"
    icon="folder"
  >
    <els-form v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 mt-2.5" @submit="handle">
      <els-input-text
        v-model="fields.title"
        name="title"
        left-icon="text"
        title="models.title.title"
        :title-fixed="false"
        rules="required"
        fluid
        :disabled="isSubmitting"
      />
      <div class="flex grow justify-end">
        <els-button
          :title="folder ? 'buttons.save.title' : 'buttons.add.folder.title'"
          type="submit"
          :disabled="!meta.valid"
          :loading="isSubmitting"
        />
      </div>
    </els-form>
  </app-modal>
</template>

<script lang="ts">
type Props = {
  folder?: Portfolios.NavigatorItem
}
</script>
