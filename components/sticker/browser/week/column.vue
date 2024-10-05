<script setup lang="ts">
withDefaults(defineProps<Props>(), {

})
</script>

<template>
  <div class="grid grid-rows-[repeat(2,_max-content)_1fr] overflow-hidden w-[300px]">
    <div class="grid grid-cols-[1fr_max-content] items-center justify-between mt-1.5 gap-1.5">
      <!--      height: 26px; -->

      {{ useLangs(date) }}
      <div>
        <!--        grid-column-gap: 3px;
        height: 26px;
        margin-top: 4px;
        padding-right: 16px;
        padding-left: 8px; -->
      </div>
    </div>
    <div class="bg-backgrounds-primary rounded mb-1.5 max-w-[300px]">
      2
    </div>
    <div class="relative grid grid-rows-[1fr] overflow-hidden">
      3
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  date: string
}
</script>
