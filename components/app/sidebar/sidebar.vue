<template>
  <div class="flex-col items-stretch relative w-full flex-shrink-0 hidden tablet:flex tablet:w-[calc(var(--sidebar-master-width)_+_var(--sidebar-slave-width))]">
    <div class="flex grow justify-between overflow-hidden">
      <app-sidebar-master />
      <app-sidebar-slave />
    </div>
  </div>
</template>
