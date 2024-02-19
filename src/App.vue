<script setup lang="ts">
  import { HfButton, HfIconButton, HfDropdownMenu } from '@/components';
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
        <hf-button
          noStyle
          class="p-2 border-b border-b-green-500 hover:scale-x-75"
          >Click me</hf-button
        >
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
        <hf-dropdown-menu :content-data="[1, 2, 3, 4, 5, 6]">
          <template #default="{ data }">
            <div class="flex flex-col gap-y-2">
              <div
                v-for="item in data"
                :key="item"
                class="p-2 bg-gray-500 rounded-md"
              >
                {{ item }}
              </div>
            </div>
          </template>
        </hf-dropdown-menu>
      </div>
    </div>
  </div>
</template>
