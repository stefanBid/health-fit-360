<script setup lang="ts">
import {
	HfButton,
	HfIconButton,
	HfDropdownMenu,
	HfToggle,
	HfInput,
	HfCombobox,
	HfInfoBox,
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

const items = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' },
];

const combo1 = ref([]);
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="p-2">
      <h1>Button</h1>
      <div class="space-x-2">
        <hf-button id="btn-1">
          Click me
        </hf-button>
        <hf-button color="yellow">
          Click me
        </hf-button>
        <hf-button color="violet">
          Click me
        </hf-button>
        <hf-button disabled>
          Click me
        </hf-button>
        <hf-button
          no-style
          class="p-2 border-b border-b-green-500 hover:scale-x-75"
        >
          Click me
        </hf-button>
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
          :menu-icon="PlusCircleIcon"
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
          :on-send-option="(option) => test(option)"
        />
      </div>
    </div>
    <div class="p-2">
      <h1>Toggle</h1>
      <div class="flex items-center gap-x-2">
        <hf-toggle
          id="toggle-1"
          v-model:enabled="toggle1"
          label="Toggle"
          color="blue"
        />
        <hf-toggle
          id="toggle-2"
          v-model:enabled="toggle2"
          label="Toggle"
          color="yellow"
        />
        <hf-toggle
          id="toggle-3"
          v-model:enabled="toggle3"
          label="Toggle"
          color="violet"
          :dot-icon="{ enabled: SunIcon, disabled: MoonIcon }"
        />
      </div>
    </div>
    <div class="p-2">
      <h1>Input</h1>
      <div class="flex flex-col gap-y-4">
        <hf-input
          id="input-1"
          v-model:inputValue="inputValue"
          label="Input"
          :disabled="!toggle1"
        >
          <template #toggle>
            <hf-toggle
              id="toggle-input-1"
              v-model:enabled="toggle1"
              color="blue"
            />
          </template>
        </hf-input>
        <hf-input
          id="input-2"
          v-model:inputValue="inputValue2"
          label="Input"
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
          id="input-3"
          v-model:inputValue="inputValue3"
          label="Input"
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

    <div class="p-2">
      <h1>Combobox</h1>
      {{ combo1 }}
      <div class="flex flex-col gap-y-4">
        <HfCombobox
          id="combobox-1"
          v-model:selected-option="combo1"
          :items="items"
          :disabled="!toggle1"
          color="violet"
          label="Combobox-1"
          help="This is a combobox"
          display-key="label"
          value-key="value"
          add-if-not-found-option
          multiple
        >
          <template #toggle>
            <hf-toggle
              id="toggle-combobox-1"
              v-model:enabled="toggle1"
              color="blue"
            />
          </template>
        </HfCombobox>
      </div>
    </div>

    <div class="p-2">
      <h1>Info Box</h1>
      <div class="space-x-2">
        <HfInfoBox text="This is a tooltip" />
        <HfInfoBox text="This is a tooltip" />
        <HfInfoBox text="This is a tooltip" />
      </div>
    </div>
  </div>
</template>
