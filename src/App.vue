<script setup lang="ts">
import {
	HfCombobox,
	HfToggle
} from '@/components';
import { ref } from 'vue';

const options = [
	{
		optionKey: 'option1',
		optionLabel: 'Option 1',
	},
	{
		optionKey: 'option2',
		optionLabel: 'Option 2',
	},
	{
		optionKey: 'option3',
		optionLabel: 'Option 3',
	}
]

const optionSelected = ref('sdsdssdsdsdsd');
const enabled = ref(false);
</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    {{ optionSelected }}
    <HfCombobox
      v-model:selected-option="optionSelected"
      :items="options"
      color="yellow"
      label="Combobox"
      :disabled="!enabled"
      help="This is a combobox"
      display-key="optionLabel"
      value-key="optionKey"
    >
      <template #toggle>
        <HfToggle
          v-model:enabled="enabled"
        />
      </template>
    </HfCombobox>
  </div>
</template>
