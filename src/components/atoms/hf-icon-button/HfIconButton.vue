<script setup lang="ts">
import type { ColorVariantSettings } from '@/types/global.types';
import { computed, type FunctionalComponent } from 'vue';
import { EyeIcon } from '@heroicons/vue/24/solid';

interface HfIconButtonProps {
  color?: ColorVariantSettings;
  icon?: FunctionalComponent;
  disabled?: boolean;
  noStyle?: boolean;
}

const props = withDefaults(defineProps<HfIconButtonProps>(), {
	color: 'green',
	icon: undefined,
	disabled: false,
	noStyle: false,
});

const getButtonStyle = computed(() => {
	if (props.noStyle) {
		return ['outline-none'];
	}

	const style = [
		'p-2 text-base transition-all duration-200 ease-in-out rounded-md outline-none shrink-0 w-fit',
	];

	// Color
	if (props.color === 'red') {
		style.push('bg-red-500 hover:bg-red-600 active:bg-red-700  text-white');
	} else if (props.color === 'green') {
		style.push('bg-green-500 hover:bg-green-600 active:bg-green-700 text-white');
	} else if (props.color === 'gray') {
		style.push('bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-black');
	}

	// Disabled
	if (props.disabled) {
		style.push('cursor-not-allowed pointer-events-none opacity-50');
	} else {
		style.push('cursor-pointer opacity-100');
	}

	return style.join(' ');
})
</script>

<template>
  <button
    v-bind="$attrs"
    :class="getButtonStyle"
  >
    <component
      :is="props.icon || EyeIcon"
      class="transition-all duration-200 ease-in-out size-5 sm:size-4 xs:size-4 shrink-0"
    />
  </button>
</template>
