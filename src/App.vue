<script setup lang="ts">
import { HfButton, HfIconButton, HfDropdownMenu } from '@/components';
import {
  TrashIcon,
  XMarkIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/solid';

const test = (option: string) => {
  console.log(option);
};
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="p-2">
      <h1>Button</h1>
      <div class="space-x-2">
        <hf-button id="btn-1">Click me</hf-button>
        <hf-button color="yellow">Click me</hf-button>
        <hf-button color="violet">Click me</hf-button>
        <hf-button disabled>Click me</hf-button>
        <hf-button noStyle class="p-2 border-b border-b-green-500 hover:scale-x-75">Click me</hf-button>
      </div>
    </div>
    <div class="p-2">
      <h1>Icon Button</h1>
      <div class="space-x-2">
        <hf-icon-button color="green" :icon="PlusCircleIcon" />
        <hf-icon-button color="red" :icon="TrashIcon" />
        <hf-icon-button color="gray" :icon="XMarkIcon" class="hover:rotate-180" />
        <hf-icon-button disabled />
        <hf-dropdown-menu>
          <div class="flex flex-col gap-y-2">
            <div v-for="item in 5" :key="item" class="p-2 bg-gray-500 rounded-md">
              {{ item }}
            </div>
          </div>
        </hf-dropdown-menu>
        <HfDropdownMenu :options="[{
          optionKey: '1',
          optionLabel: 'Option 1',
          icon: PlusCircleIcon,
        }, {
          optionKey: '2',
          optionLabel: 'Option 2',
          icon: TrashIcon,
        }, {
          optionKey: '3',
          optionLabel: 'Option 3',
          icon: XMarkIcon,
        }]" />
        <HfDropdownMenu :menuIcon="PlusCircleIcon" :options="[{
          optionKey: '1',
          optionLabel: 'Option 1',
          icon: PlusCircleIcon,
        }, {
          optionKey: '2',
          optionLabel: 'Option 2',
          icon: TrashIcon,
        }, {
          optionKey: '3',
          optionLabel: 'Option 3',
          icon: XMarkIcon,
        }]" :onSendOption="option => test(option)" />
      </div>
    </div>
  </div>
</template>
