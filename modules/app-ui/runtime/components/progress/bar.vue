<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  value: null,
  max: 100,
  indicator: false,
  animation: 'carousel',
  size: 'sm',
  color: 'primary',
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('progress', toRef(props, 'ui'), config, toRef(props, 'class'))

const indicatorContainerClass = computed(() => {
  return twJoin(
    ui.value.indicator.container.base,
    ui.value.indicator.container.width,
    ui.value.indicator.container.transition,
  )
})

const indicatorClass = computed(() => {
  return twJoin(
    ui.value.indicator.align,
    ui.value.indicator.width,
    ui.value.indicator.color,
    ui.value.indicator.size[props.size],
  )
})

const progressClass = computed(() => {
  const classes = [
    ui.value.progress.base,
    ui.value.progress.width,
    ui.value.progress.size[props.size],
    ui.value.progress.rounded,
    ui.value.progress.track,
    ui.value.progress.bar,
    // Intermediate class to allow thumb ring or background color (set to `current`) as it's impossible to safelist with arbitrary values
    ui.value.progress.color?.replaceAll('{color}', props.color),
    ui.value.progress.background,
    ui.value.progress.indeterminate.base,
    ui.value.progress.indeterminate.rounded,
  ]

  if (isIndeterminate.value) {
    classes.push(ui.value.animation[props.animation])
  }

  return twJoin(...classes)
})

const stepsClass = computed(() => {
  return twJoin(
    ui.value.steps.base,
    ui.value.steps.color?.replaceAll('{color}', props.color),
    ui.value.steps.size[props.size],
  )
})

const stepClass = computed(() => {
  return twJoin(
    ui.value.step.base,
    ui.value.step.align,
  )
})

const stepActiveClass = computed(() => {
  return twJoin(
    ui.value.step.active,
  )
})

const stepFirstClass = computed(() => {
  return twJoin(
    ui.value.step.first,
  )
})

function isActive(index: number) {
  return index === Number(props.value)
}

function isFirst(index: number) {
  return index === 0
}

function stepClasses(index: string | number) {
  index = Number(index)

  const classes = [stepClass.value]

  if (isFirst(index)) {
    classes.push(stepFirstClass.value)
  }

  if (isActive(index)) {
    classes.push(stepActiveClass.value)
  }

  return classes.join(' ')
}

const isIndeterminate = computed(() => props.value === undefined || props.value === null)
const isSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value) {
    return null
  }

  if (Array.isArray(props.max)) {
    return props.max.length - 1
  }

  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  switch (true) {
    case props.value < 0: return 0
    case props.value > (realMax.value as number): return 100
    default: return (props.value / (realMax.value as number)) * 100
  }
})
</script>

<template>
  <div :class="ui.wrapper" role="progressbar">
    <slot v-if="indicator || $slots.indicator" name="indicator" v-bind="{ percent }">
      <div v-if="!isSteps" :class="indicatorContainerClass" :style="{ width: `${percent}%` }">
        <div :class="indicatorClass">
          {{ Math.round(percent) }}%
        </div>
      </div>
    </slot>

    <progress
      :aria-valuemax="realMax"
      :aria-valuenow="value"
      :class="progressClass"
      v-bind="{ value, max: realMax, ...attrs }"
    >
      {{ percent !== undefined ? `${Math.round(percent)}%` : undefined }}
    </progress>

    <div v-if="isSteps" :class="stepsClass">
      <div v-for="(step, index) in max" :key="index" :class="stepClasses(index)">
        <slot :name="`step-${index}`" v-bind="{ step }">
          {{ step }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCore } from '../../composables'
import { mergeConfig, twJoin } from '../../utils'
// @ts-expect-error
import appConfig from '#build/app.config'
import { progress as el } from '#app-ui/configs'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.progress, el)

type Props = {
  value?: number
  max?: number | any[]
  indicator?: boolean
  animation?: 'carousel' | 'carousel-inverse' | 'swing' | 'elastic'
  size?: ELEMENTS.SIZE
  color?: ELEMENTS.COLOR
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>

<style scoped>
/** These styles are required to animate the bar */
progress:indeterminate {
  @apply relative;

  &:after {
    @apply content-[''];
    @apply absolute inset-0;
    @apply bg-current;
  }

  &::-webkit-progress-value {
    @apply bg-current;
  }

  &::-moz-progress-bar {
    @apply bg-current;
  }

  &.bar-animation-carousel {
    &:after {
      animation: carousel 2s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: carousel 2s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: carousel 2s ease-in-out infinite;
    }
  }

  &.bar-animation-carousel-inverse {
    &:after {
      animation: carousel-inverse 2s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: carousel-inverse 2s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: carousel-inverse 2s ease-in-out infinite;
    }
  }

  &.bar-animation-swing {
    &:after {
      animation: swing 3s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: swing 3s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: swing 3s ease-in-out infinite;
    }
  }

  &.bar-animation-elastic {
    &::after {
      animation: elastic 3s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: elastic 3s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: elastic 3s ease-in-out infinite;
    }
  }
}

@keyframes carousel {

  0%,
  100% {
    width: 50%
  }

  0% {
    transform: translateX(-100%)
  }

  100% {
    transform: translateX(200%)
  }
}

@keyframes carousel-inverse {

  0%,
  100% {
    width: 50%
  }

  0% {
    transform: translateX(200%)
  }

  100% {
    transform: translateX(-100%)
  }
}

@keyframes swing {

  0%,
  100% {
    width: 50%
  }

  0%,
  100% {
    transform: translateX(-25%)
  }

  50% {
    transform: translateX(125%)
  }
}

@keyframes elastic {

  /* Firefox doesn't do "margin: 0 auto", we have to play with margin-left */
  0%,
  100% {
    width: 50%;
    margin-left: 25%;
  }

  50% {
    width: 90%;
    margin-left: 5%
  }
}
</style>
