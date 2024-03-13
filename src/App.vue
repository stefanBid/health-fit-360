<script setup lang="ts">
import {
	HfDropdownMenu
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

const optionSelected = ref('');

</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    {{ optionSelected }}
    <HfDropdownMenu

      :on-send-option="option => {optionSelected = option}"
    >
      <h1>Prova</h1>
      <div class="flex flex-col gap-y-6">
        <span
          v-for="option in options"
          :key="option.optionKey"
          @click="optionSelected = option.optionLabel"
        >
          {{ option.optionLabel }}
        </span>
      </div>
    </HfDropdownMenu>
  </div>
</template>
