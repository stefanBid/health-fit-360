<script setup lang="ts">
import type { ColorVariantExtra } from '@/types/global.types';


interface HfButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: ColorVariantExtra;
  disabled?: boolean;
  noStyle?: boolean;
}

const props = withDefaults(defineProps<HfButtonProps>(), {
  type: 'button',
  color: 'blue',
  disabled: false,
  noStyle: false,
});
</script>

<template>
  <button v-bind="$attrs" :type="props.type"
    class="text-base transition-all duration-200 ease-in-out outline-none sm:text-sm xs:text-sm " :class="[
      {
        'inline-flex items-center justify-center px-4 py-2 transition-all duration-200 ease-in-out rounded-md w-fit gap-x-1':
          !props.noStyle,
      },
      {
        'bg-blue-500 hover:bg-blue-600 active:bg-blue-700  text-white ':
          props.color === 'blue' && !props.noStyle,
        'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700   text-white':
          props.color === 'yellow' && !props.noStyle,
        'bg-violet-500 hover:bg-violet-600 active:bg-violet-700  text-white':
          props.color === 'violet' && !props.noStyle,
      },
      props.disabled
        ? 'cursor-not-allowed pointer-events-none opacity-50'
        : 'cursor-pointer opacity-100',
    ]">
    <slot />
  </button>
</template>
