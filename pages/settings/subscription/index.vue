<script setup lang="ts">
import { Form as ElsForm } from 'vee-validate'
import { useLangs, useHead, useStoreAuth, useCrumbs, useErrorHandler } from '#imports'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.settings.index.headings.title', to: 'settings' },
  { name: 'pages.settings.subscription.index.headings.title' },
])

setTitle('pages.settings.subscription.index.headings.title')

useHead({
  title: useLangs('pages.settings.subscription.index.headings.title'),
})

const storeAuth = useStoreAuth()
const subscription = computed(() => storeAuth.subscription)

const services = ref<Map<string, Subscriptions.MapPlan[]>>(new Map())

const fields = reactive({
  period: 30,
  members: 0,
})

const datasets = reactive({
  max_members: 1,
  price: 0,
})

const { data, error, status, refresh } = await useLazyFetch<Subscriptions.D_TariffCalculator>('/api/subscription/tariff/scale')
watch(data, (newData) => {
  for (const key in newData.data.data) {
    const _services: Subscriptions.MapPlan[] = []
    newData.data.data[key].forEach(s => _services.push(s))
    services.value.set(key, _services)
  }

  fields.members = subscription.value.data.attributes.members
  datasets.price = subscription.value.data.attributes.price
})

const plans_ids = computed(() => subscription.value.data.relationships.plans.map(p => p.id))
const plans_new_ids = computed(() => {
  const ids = []
  services.value.forEach(_plan => _plan.forEach(p => p.is_active && ids.push(p.id)))
  return ids
})
const plans_is_equal = computed(() => JSON.stringify(plans_ids.value) === JSON.stringify(plans_new_ids.value))
const plan_new = computed(() => {
  const plans: Subscriptions.MapPlan[] = []
  let root: Subscriptions.MapPlan = null
  let _price = 0
  services.value.forEach(_plan => _plan.forEach((p) => {
    if (p.is_active) {
      plans.push(p)
      _price += (p.price[fields.period] * (fields.period === 30 ? 1 : 12))
    }

    if (p.is_active && p.is_root) {
      root = p
      datasets.max_members = p.max_members === -1 ? 999 : p.max_members
    }
  }))
  return { plans, root, price: _price }
})

watch(error, (newError) => {
  useErrorHandler(newError)
})
watch(plan_new, () => {
  calc()
})
watch(fields, () => {
  calc()
})

async function calc() {
  if (status.value === 'pending') return

  if (subscription.value.data.attributes.price == 0) {
    let amount = 0
    plan_new.value.plans.forEach(p => p.is_active && (amount += (p.price[fields.period] * (fields.period === 30 ? 1 : 12))))
    datasets.price = amount * fields.members
    return
  }

  await $fetch('/api/subscription/tariff/scale', {
    method: 'POST',
    body: {
      plansIds: plans_new_ids.value,
      members: fields.members,
      period: fields.period,
    },
  })
    .then(res => datasets.price = res.data.data)
    .catch(e => useErrorHandler(e))
}

function handle(key: string, plan: Subscriptions.MapPlan) {
  // Все текущие планы сервиса делаем неактивными и после выбранный план активируем
  services.value.get(key).forEach(p => p.is_active = false)
  plan.is_active = true

  // Получаем индекс выбранного плана
  const index = services.value.get(key).findIndex(i => i.id === plan.id)

  // Просматриваем отсальные планы
  services.value.forEach((_plan, _key) => {
    if (_key === key) return

    _plan.forEach((p, idx) => {
      if (p.is_root && p.is_active && index > idx) {
        services.value.get(_key).forEach(p => p.is_active = false)
        services.value.get(_key)[index].is_active = true
        return
      }
    })

    // Получаем индекс базового плана
    const root_index = services.value.get('dashboard').findIndex(i => i.is_root && i.is_active)

    _plan.forEach((p, idx) => {
      if (!p.is_root && p.is_active && (idx > root_index)) {
        services.value.get(_key).forEach(p => p.is_active = false)
        services.value.get(_key)[root_index].is_active = true
      }
    })
  })
}

async function pay() {
  await $fetch('/api/subscription/tariff/change', {
    method: 'POST',
    body: {
      plansIds: plans_new_ids.value,
      members: fields.members,
      period: fields.period,
    },
  }).then(async (res) => {
    if (res.data.url) {
      location.href = res.data.url
    }
    else {
      // await refresh()
    }
  })
}
</script>

<template>
  <app-page scrollable class="bg-backgrounds-primary select-none">
    <subscription-header />
    <els-form v-slot="{ isSubmitting, meta }" class="h-full py-2.5" @submit="pay">
      <div class="flex flex-col laptop:flex-row h-full mx-2.5 gap-2.5 laptop:gap-0">
        <div class="order-1 laptop:mr-2.5 laptop:flex-[1_auto] laptop:min-w-0 gap-2.5">
          <subscription-leading-service v-for="service in services" :key="service[0]" :service="service">
            <div
              v-for="(plan, jdx) in service[1]"
              :key="plan.id"
              class="ring-[2px] ring-inset rounded-md p-2.5 grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-1.5 transition-[box-shadow,_background]"
              :class="[
                plan.is_active ? 'ring-primary bg-gray-6/50' : 'ring-backgrounds-secondary cursor-pointer',
                isSubmitting || (plan.is_root && plan.max_members !== -1 && (plan.max_members < fields.members)) && 'pointer-events-none bg-backgrounds-secondary',
              ]"
              @click="() => !(isSubmitting || plan.is_active || (plan.is_root && plan.max_members !== -1 && (plan.max_members < fields.members))) && handle(service[0], plan)"
            >
              <div class="text-title6 font-medium truncate">
                {{ useLangs(`pages.settings.subscription.plans.${plan.title}.title`) }}
              </div>
              <subscription-leading-features :features="plan.features">
                <li v-if="jdx > 0" class="flex gap-0.5 text-fonts-primary">
                  <els-icon name="solar:check-read-linear" size="14" class="text-primary" />
                  <span class="truncate text-sm font-medium">
                    {{ useLangs(`pages.settings.subscription.plans.${service[1][jdx - 1].title}.description`) }}
                  </span>
                </li>
              </subscription-leading-features>
              <div class="text-right w-full">
                <div class="text-title2 font-medium truncate">
                  {{ useLangs('models.price.title', { total: plan.price[fields.period] }) }}
                </div>
                <div class="text-caption1 text-muted font-light truncate">
                  {{ useLangs('models.per-user.title') }}
                </div>
              </div>
            </div>
          </subscription-leading-service>
        </div>
        <div class="flex-col w-full order-2 laptop:flex-zero laptop:w-[340px] pb-2.5">
          <div class="laptop:sticky laptop:top-2.5 space-y-2.5">
            <div class="flex flex-col p-2.5 rounded bg-gray-6 gap-2.5">
              <div class="font-medium">
                {{ useLangs('models.period-pay.title') }}
              </div>
              <div class="rounded-sm p-1 bg-backgrounds-primary grid grid-cols-2 gap-1.5 relative uppercase font-medium text-[0.725rem] text-muted">
                <div class="rounded-sm ring-inset ring-gray-6 ring-[1px] bg-gray-6/50 absolute h-[calc(100%_-_theme(padding.2))] w-[calc(50%_-_theme(padding.1))] top-1 transition-transform" :class="[fields.period === 30 ? 'left-1' : 'translate-x-[calc(100%_+_theme(padding.1))]']" />
                <div class="z-1 px-1 py-0.5 flex flex-center grow cursor-pointer" :class="[fields.period===30 && 'text-labels-primary']" @click="fields.period=30">
                  {{ useLangs('models.period-pay.30.title') }}
                </div>
                <div class="z-1 px-1 py-0.5 flex flex-center grow cursor-pointer" :class="[fields.period===365 && 'text-labels-primary']" @click="fields.period=365">
                  {{ useLangs('models.period-pay.365.title', { val: 100 * (1 - subscription.data.relationships.sale) }) }}
                </div>
              </div>
              <div class="space-y-0.5">
                <div class="font-medium">
                  {{ useLangs('models.members-max.title') }}
                </div>
                <els-input-number
                  v-model="fields.members"
                  name="members"
                  :min="1"
                  :max="datasets.max_members"
                  fluid
                  :step="1"
                  rules="required|min:1"
                  :ui="{ bg: 'bg-backgrounds-primary' }"
                />
              </div>

              <subscription-trailing-tariff />
              <subscription-trailing-tariff-new
                v-if="!plans_is_equal && plan_new.plans && plan_new.root"
                :members="fields.members"
                :period="fields.period"
                :plan="plan_new"
              />

              <div class="text-title5 font-semibold">
                {{ useLangs('models.amount.title', { total: datasets.price }) }}
              </div>
              <els-button
                fluid
                title="buttons.update.tariff.title"
                type="submit"
                :loading="isSubmitting"
                :disabled="!meta.valid || plans_is_equal"
              />
              <subscription-trailing-payment-icons />
              <subscription-trailing-terms />
            </div>
            <div class="flex flex-col p-2.5 rounded bg-gray-6 gap-2.5">
              <div class="font-medium">
                {{ useLangs('pages.settings.subscription.trailing.ul.title') }}
              </div>
              <div class="text-callout font-light">
                {{ useLangs('pages.settings.subscription.trailing.ul.description') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </els-form>
  </app-page>
</template>
