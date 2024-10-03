<script setup lang="ts">
import { useLangs, useStoreAuth, useDates } from '#imports'

withDefaults(defineProps<Props>(), {})

const storeAuth = useStoreAuth()
const subscription = computed(() => storeAuth.subscription)
</script>

<template>
  <div class="space-y-1.5 p-2.5 bg-backgrounds-primary rounded text-sm">
    <div class="flex items-start justify-between text-md">
      {{ useLangs('pages.settings.subscription.trailing.tariff.new.title') }}
      <subscription-tariff-marker :title="plan.root.title" />
    </div>
    <p class="text-muted">
      {{ useLangs('pages.settings.subscription.trailing.tariff.new.renews-at', { val: useDates(subscription.data.attributes.renews_at || subscription.data.attributes.ends_at).date }) }}
    </p>
    <div class="space-y-1.5">
      <p class="text-muted">
        {{ useLangs('models.members-val.title', { val: members }) }}
      </p>
      <template v-for="new_plan in plan.plans">
        <div v-if="new_plan.price[period] > 0" :key="new_plan.id" class="flex flex-col gap-0.5 bg-backgrounds-secondary rounded-sm p-1.5">
          <div class="grid grid-cols-[1fr_max-content]">
            <div class="space-y-0.5">
              <div>
                {{ useLangs(`pages.settings.subscription.services.${new_plan.id.split('_')[0]}.title`) }}
              </div>
              <div class="text-muted lowercase">
                {{ useLangs(`models.amount.tariff.${period}`, { total: new_plan.price[period] * (period === 30 ? 1 : 12) }) }}
              </div>
            </div>
            <div>
              <subscription-tariff-marker :title="new_plan.title" />
            </div>
          </div>
        </div>
      </template>
      <p>
        {{ useLangs(`models.amount.per-user-period.${period}${plan.price === 0 ? '.free' : ''}`, { total: plan.price }) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  members: number
  period: 30 | 365
  plan: any
}
</script>
