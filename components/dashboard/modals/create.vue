<script setup lang="ts">
import { Form as ElsForm } from 'vee-validate'
import { useErrorHandler } from '~/composables'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void
}>()

const visible = computed({
  get: () => {
    return props.modelValue
  },
  set: (newValue) => {
    emits('update:model-value', newValue)
  },
})

const fields = reactive({
  title: '',
  description: '',
})
async function handleCreate() {
  await $fetch('/api/dashboard/create', {
    method: 'POST',
    body: {
      title: fields.title,
      description: fields.description,
    },
  })
    .then(async () => {
      emits('update:model-value', false)
      await redirect()
    })
    .catch(e => useErrorHandler(e))
}
</script>

<template>
  <app-modal
    v-model="visible"
    title="pages.dashboard.modals.create.headings.title"
    description="pages.dashboard.modals.create.headings.description"
    icon="dashboard"
  >
    <els-form v-slot="{ isSubmitting, meta }" class="flex flex-col gap-2.5 mt-2.5" @submit="handleCreate">
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
      <els-input-text-area
        v-model="fields.description"
        name="description"
        title="models.description.title"
        :title-fixed="false"
        fluid
        :rows="5"
        :disabled="isSubmitting"
      />
      <div class="flex grow justify-end">
        <els-button
          title="buttons.create.dashboard.title"
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
  modelValue?: boolean
}
</script>
