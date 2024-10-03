<script setup lang="ts">

</script>

<template>
  <div class="relative flex items-center w-full gap-2.5 min-h-[--row-min-height] p-2.5 bg-backgrounds-primary">
    <!--    z-index: 10; -->
    <div class="flex items-center gap-2.5">
      <els-link :to="{ name: 'settings-subscription' }" active-class="text-primary">
        {{ useLangs('pages.settings.subscription.index.headings.constructor') }}
      </els-link>
      <els-link :to="{ name: 'settings-subscription-bills' }" active-class="text-primary">
        {{ useLangs('pages.settings.subscription.bills.index.headings.title') }}
      </els-link>
      <els-link :to="{ name: 'settings-subscription-transactions' }" active-class="text-primary">
        {{ useLangs('pages.settings.subscription.transactions.index.headings.title') }}
      </els-link>
    </div>
    <div class="flex items-center" />
  </div>
</template>
