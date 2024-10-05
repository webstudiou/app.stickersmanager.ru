<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  duration: 250,
  delay: 0,
  noOpacity: false,
  appear: false,
  mode: undefined,
  group: false,
  noMove: false,
  moveDuration: 250,
  axis: 'y',
})
</script>

<template>
  <transition-expand
    :axis
    :duration
    :delay
    :no-opacity
    :appear
    :mode
    :group
    :no-move
    :move-duration
  >
    <slot />
  </transition-expand>
</template>

<script lang="ts">
type Props = {
  duration?: number
  delay?: number
  noOpacity?: boolean
  appear?: boolean
  mode?: string
  group?: boolean
  noMove?: boolean
  moveDuration?: number
  axis?: 'x' | 'y'
}
</script>
