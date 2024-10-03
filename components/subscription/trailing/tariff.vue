<script setup lang="ts">
import { useLangs, useStoreAuth, useDates } from '#imports'

const storeAuth = useStoreAuth()
const subscription = computed(() => storeAuth.subscription)
</script>

<template>
  <div class="space-y-1.5 p-2.5 bg-backgrounds-primary rounded text-sm">
    <div class="flex items-start justify-between text-md">
      {{ useLangs('pages.settings.subscription.trailing.tariff.index.title') }}
      <subscription-tariff-marker :title="subscription.data.attributes.title" />
    </div>
    <p class="text-muted">
      {{ useLangs('pages.settings.subscription.trailing.tariff.index.renews-at', { val: useDates(subscription.data.attributes.renews_at || subscription.data.attributes.ends_at).date }) }}
    </p>
    <div class="space-y-1.5">
      <p class="text-muted">
        {{ useLangs('models.members-val.title', { val: subscription.data.attributes.members }) }}
      </p>
      <template v-for="subscription_plan in subscription.data.relationships.plans">
        <div v-if="subscription_plan.price > 0" :key="subscription_plan.id" class="flex flex-col gap-0.5 bg-backgrounds-secondary rounded-sm p-1.5">
          <div class="grid grid-cols-[1fr_max-content]">
            <div class="space-y-0.5">
              <div>
                {{ useLangs(`pages.settings.subscription.services.${subscription_plan.key}.title`) }}
              </div>
              <div class="text-muted lowercase">
                {{ useLangs('app.plans.models.tariff.amount', { val: subscription_plan.price }) }}
                {{ useLangs(`models.amount.per-user-period.${subscription.data.attributes.interval === 30 ? 'month' : 'year'}.title`) }}
              </div>
            </div>
            <div>
              <subscription-tariff-marker :title="subscription_plan.title" />
            </div>
          </div>
        </div>
      </template>
      <p>
        {{ useLangs(`models.amount.per-user-period.${subscription.data.attributes.price === 0 ? 'free' : subscription.data.attributes.interval}`, { total: subscription.data.attributes.price }) }}
      </p>
    </div>
  </div>
</template>
