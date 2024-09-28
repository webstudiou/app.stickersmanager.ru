<script setup lang="ts">
import { useWatch } from '~/composables'

const watchEstimates = useWatch()
</script>

<template>
  <div class="flex-col hidden tablet:flex">
    <div class="flex items-center justify-end text-[2rem] font-semibold">
      {{ watchEstimates.hours }}
      <div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 6 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="3"
            cy="3"
            r="2.5"
            fill="currentColor"
            :fill-opacity="1"
          />
          <circle
            cx="3"
            cy="12"
            r="2.5"
            fill="currentColor"
            :fill-opacity="1"
          />
        </svg>
      </div>
      {{ watchEstimates.minutes }}
    </div>
  </div>
</template>
