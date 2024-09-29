<script setup lang="ts">

</script>

<template>
  <div class="m-2.5 mb-0 grid grid-flow-row auto-rows-max gap-1.5">
    <div class="flex flex-center flex-col text-muted h-[150px]">
      <els-icon name="chevron-right" size="3rem" />
      No comments
    </div>
  </div>
  <div class="sticky left-2.5 bottom-2.5 right-2.5 pointer-events-none w-[calc(100%_-_theme(spacing.5))]">
    <!--              z-index: 9; -->
    <div class="hidden">
      ???
    </div>
    <div class="flex flex-col justify-end pointer-events-none w-full h-[96px]">
      <div class="grid grid-cols-[1fr] gap-1.5 pointer-events-auto h-md">
        <div class="flex items-center px-2.5 h-md cursor-text rounded-md bg-gray-6">
          Text here...
        </div>
      </div>
    </div>
    <div v-if="1>2" class="absolute z-1 h-[96px] -right-2.5 -bottom-2.5 -left-2.5">
      <div class="absolute pointer-events-none w-[30%] h-full ml-auto inset-[auto_-4rem_0_0] z-5" />
      <div class="shadow__gradient-blur shadow__gradient-blur_first">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.shadow__gradient-blur {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}

.shadow__gradient-blur>div,.shadow__gradient-blur:before,.shadow__gradient-blur:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}

.shadow__gradient-blur:before {
  content: "";
  z-index: 1;
  -webkit-backdrop-filter: blur(.5px);
  backdrop-filter: blur(.5px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgb(255,255,255) 12.5%,rgb(255,255,255) 25%,rgba(255,255,255,0) 37.5%)
}

.shadow__gradient-blur>div:nth-of-type(1) {
  z-index: 2;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 12.5%,rgb(255,255,255) 25%,rgb(255,255,255) 37.5%,rgba(255,255,255,0) 50%)
}

.shadow__gradient-blur>div:nth-of-type(2) {
  z-index: 3;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 25%,rgb(255,255,255) 37.5%,rgb(255,255,255) 50%,rgba(255,255,255,0) 62.5%)
}

.shadow__gradient-blur>div:nth-of-type(3) {
  z-index: 4;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 37.5%,rgb(255,255,255) 50%,rgb(255,255,255) 62.5%,rgba(255,255,255,0) 75%)
}

.shadow__gradient-blur>div:nth-of-type(4) {
  z-index: 5;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 50%,rgb(255,255,255) 62.5%,rgb(255,255,255) 75%,rgba(255,255,255,0) 87.5%)
}

.shadow__gradient-blur>div:nth-of-type(5) {
  z-index: 6;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 62.5%,rgb(255,255,255) 75%,rgb(255,255,255) 87.5%,rgba(255,255,255,0) 100%)
}

.shadow__gradient-blur>div:nth-of-type(6) {
  z-index: 7;
  -webkit-backdrop-filter: blur(32px);
  backdrop-filter: blur(32px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 75%,rgb(255,255,255) 87.5%,rgb(255,255,255) 100%)
}

.shadow__gradient-blur:after {
  content: "";
  z-index: 8;
  -webkit-backdrop-filter: blur(64px);
  backdrop-filter: blur(64px);
  mask: linear-gradient(to bottom,rgba(255,255,255,0) 87.5%,rgb(255,255,255) 100%)
}
</style>
