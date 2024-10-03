<script setup lang="ts">
import { useStoreAuth } from '#imports'

withDefaults(defineProps<Props>(), {})

const storeAuth = useStoreAuth()
const subscription = computed(() => storeAuth.subscription)
</script>

<template>
  <subscription-tariff-marker v-if="limitKey !== subscription.data.attributes.tariff" :title="subscription.data.attributes.tariff" />
</template>

<script lang="ts">
type Props = {
  limitKey: Subscriptions.TariffKey
}
</script>
