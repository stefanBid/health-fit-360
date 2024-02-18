<script setup lang="ts">
  import { HfButton, HfIconButton } from '@/components';
  import {
    TrashIcon,
    XMarkIcon,
    PlusCircleIcon,
  } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="p-2">
      <h1>Button</h1>
      <div class="space-x-2">
        <hf-button>Click me</hf-button>
        <hf-button color="yellow">Click me</hf-button>
        <hf-button color="violet">Click me</hf-button>
        <hf-button disabled>Click me</hf-button>
      </div>
    </div>
    <div class="p-2">
      <h1>Icon Button</h1>
      <div class="space-x-2">
        <hf-icon-button
          color="green"
          :icon="PlusCircleIcon"
        />
        <hf-icon-button
          color="red"
          :icon="TrashIcon"
        />
        <hf-icon-button
          color="gray"
          :icon="XMarkIcon"
          class="hover:rotate-180"
        />
        <hf-icon-button disabled />
      </div>
    </div>
  </div>
</template>
