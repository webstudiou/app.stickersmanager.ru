<script setup lang="ts">
import { useLangs } from '#imports'
</script>

<template>
  <div class="text-justify text-callout space-y-1.5 font-light">
    <p>
      {{ useLangs('pages.settings.subscription.trailing.terms.title1') }}
      <els-link href="https://stickersmanager.ru/docs/terms-of-use" class="text-primary">
        {{ useLangs('pages.settings.subscription.trailing.terms.title2') }}
      </els-link>
    </p>
    <p>
      {{ useLangs('pages.settings.subscription.trailing.terms.title3') }}
    </p>
  </div>
</template>
