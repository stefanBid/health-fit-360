<script setup lang="ts">
  import {
    HfButton,
    HfIconButton,
    HfDropdownMenu,
    HfToggle,
    HfInput,
  } from '@/components';
  import {
    TrashIcon,
    XMarkIcon,
    PlusCircleIcon,
    SunIcon,
    MoonIcon,
  } from '@heroicons/vue/24/outline';

  import { ref } from 'vue';

  const test = (option: string) => {
    console.log(option);
  };

  const toggle1 = ref(true);
  const toggle2 = ref(true);
  const toggle3 = ref(true);

  const inputValue = ref('');
  const inputValue2 = ref('');
  const inputValue3 = ref(0);
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
        <hf-icon-button
          no-style
          class="border"
          :icon="PlusCircleIcon"
        />
        <hf-icon-button disabled />
        <hf-dropdown-menu>
          <div class="flex flex-col gap-y-2">
            <div
              v-for="item in 5"
              :key="item"
              class="p-2 bg-gray-500 rounded-md"
            >
              {{ item }}
            </div>
          </div>
        </hf-dropdown-menu>
        <HfDropdownMenu
          :options="[
            {
              optionKey: '1',
              optionLabel: 'Option 1',
              icon: PlusCircleIcon,
            },
            {
              optionKey: '2',
              optionLabel: 'Option 2',
              icon: TrashIcon,
            },
            {
              optionKey: '3',
              optionLabel: 'Option 3',
              icon: XMarkIcon,
            },
          ]"
        />
        <HfDropdownMenu
          :menuIcon="PlusCircleIcon"
          :options="[
            {
              optionKey: '1',
              optionLabel: 'Option 1',
              icon: PlusCircleIcon,
            },
            {
              optionKey: '2',
              optionLabel: 'Option 2',
              icon: TrashIcon,
            },
            {
              optionKey: '3',
              optionLabel: 'Option 3',
              icon: XMarkIcon,
            },
          ]"
          :onSendOption="(option) => test(option)"
        />
      </div>
    </div>
    <div class="p-2">
      <h1>Toggle</h1>
      <div class="flex items-center gap-x-2">
        <hf-toggle
          id="toggle-1"
          label="Toggle"
          v-model:enabled="toggle1"
          color="blue"
        />
        <hf-toggle
          id="toggle-2"
          label="Toggle"
          v-model:enabled="toggle2"
          color="yellow"
        />
        <hf-toggle
          id="toggle-3"
          label="Toggle"
          v-model:enabled="toggle3"
          color="violet"
          :dot-icon="{ enabled: SunIcon, disabled: MoonIcon }"
        />
      </div>
    </div>
    <div class="p-2">
      <h1>Input</h1>
      <div class="flex flex-col gap-y-4">
        <hf-input
          label="Input"
          v-model:inputValue="inputValue"
          id="input-1"
          :disabled="!toggle1"
        >
          <template #toggle>
            <hf-toggle
              id="toggle-input-1"
              v-model:enabled="toggle1"
              color="blue"
            />
          </template>
          <template #persistent>
            <hf-icon-button
              no-style
              :icon="XMarkIcon"
            />
          </template>
        </hf-input>
        <hf-input
          label="Input"
          v-model:inputValue="inputValue2"
          id="input-2"
          :disabled="!toggle2"
          color="yellow"
        >
          <template #toggle>
            <hf-toggle
              id="toggle-input-2"
              v-model:enabled="toggle2"
              color="yellow"
            />
          </template>
        </hf-input>
        {{ inputValue3 }}
        <hf-input
          label="Input"
          v-model:inputValue="inputValue3"
          id="input-3"
          :disabled="!toggle3"
          color="violet"
          type="number"
          unit="bpm"
        >
          <template #toggle>
            <hf-toggle
              id="toggle-input-3"
              v-model:enabled="toggle3"
              color="violet"
            />
          </template>
        </hf-input>
      </div>
    </div>
  </div>
</template>
