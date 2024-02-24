<script setup lang="ts">
import type { ColorVariantSettings } from '@/types/global.types';
import type { FunctionalComponent } from 'vue';
import { EyeIcon } from '@heroicons/vue/24/solid';

defineOptions({ inheritAttrs: false });

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
</script>

<template>
  <button v-bind="$attrs" class="text-base transition-all duration-200 ease-in-out outline-none shrink-0" :class="[
    {
      'p-2 rounded-md w-fit':
        !props.noStyle,
    },
    {
      'bg-red-500 hover:bg-red-600 active:bg-red-700  text-white ':
        props.color === 'red' && !props.noStyle,
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        props.color === 'green' && !props.noStyle,
      'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-black':
        props.color === 'gray' && !props.noStyle,
    },
    props.disabled
      ? 'cursor-not-allowed pointer-events-none opacity-50'
      : 'cursor-pointer opacity-100',
  ]">
    <component :is="props.icon || EyeIcon"
      class="w-5 h-5 transition-all duration-200 ease-in-out sm:w-4 sm:h-4 xs:w-4 xs:h-4 shrink-0" />
  </button>
</template>
