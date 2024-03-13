<script setup lang="ts">
import type { ColorVariantExtra } from '@/types/global.types';
import { computed } from 'vue';

interface HfButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'fit' | 'custom';
  color?: ColorVariantExtra;
  disabled?: boolean;
  noStyle?: boolean;
}

const props = withDefaults(defineProps<HfButtonProps>(), {
	type: 'button',
	size: 'fit',
	color: 'blue',
	disabled: false,
	noStyle: false,
});

const getButtonStyle = computed(() => {
	if (props.noStyle) {
		return ['outline-none']
	}

	const style = ['inline-flex items-center justify-center px-4 py-2 text-base text-white transition-all duration-200 ease-in-out rounded-md outline-none gap-x-1 sm:text-sm xs:text-sm'];

	// Color
	if (props.color === 'blue') {
		style.push('bg-blue-500 hover:bg-blue-600 active:bg-blue-700');
	} else if (props.color === 'yellow') {
		style.push('bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700');
	} else if (props.color === 'violet') {
		style.push('bg-violet-500 hover:bg-violet-600 active:bg-violet-700');
	}

	// Size
	if (props.size === 'fit') {
		style.push('w-fit');
	} else {
		style.push('truncate');
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
    :type="props.type"
    :class="getButtonStyle"
  >
    <slot></slot>
  </button>
</template>
