<script setup lang="ts">
  import type { ColorVariantExtra } from '@/types/global.types';
  import { generateId } from '@/utils';

  defineOptions({ inheritAttrs: false });

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
  <button
    :id="($attrs.id as string) || `${generateId()}-button`"
    :type="props.type"
    class="text-base transition-all duration-200 ease-in-out sm:text-sm xs:text-sm"
    :class="[
      ($attrs.class as string) || '',
      {
        'inline-flex items-center justify-center px-4 py-2 transition-all duration-200 ease-in-out rounded-md outline-none w-fit gap-x-1  focus:ring-2 focus:ring-offset-2 focus:ring-offset-inherit':
          !props.noStyle,
      },
      {
        'bg-blue-500 hover:bg-blue-600 ring-blue-600 text-white ':
          props.color === 'blue' && !props.noStyle,
        'bg-yellow-500 hover:bg-yellow-600 ring-yellow-600 text-white':
          props.color === 'yellow' && !props.noStyle,
        'bg-violet-500 hover:bg-violet-600 ring-violet-600 text-white':
          props.color === 'violet' && !props.noStyle,
      },
      props.disabled
        ? 'cursor-not-allowed pointer-events-none opacity-50'
        : 'cursor-pointer opacity-100',
    ]"
  >
    <slot />
  </button>
</template>
