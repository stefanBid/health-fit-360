<script setup lang="ts">
  import type { ColorVariantExtra } from '@/types/global.types';
  import { generateId } from '@/utils';

  defineOptions({ inheritAttrs: false });

  interface HfButtonProps {
    type?: 'button' | 'submit' | 'reset';
    color?: ColorVariantExtra;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<HfButtonProps>(), {
    type: 'button',
    color: 'blue',
    disabled: false,
  });
</script>

<template>
  <button
    :id="($attrs.id as string) || `${generateId()}-button`"
    :type="props.type"
    class="transition-all w-fit inline-flex justify-center items-center gap-x-1 duration-200 ease-in-out px-4 py-2 rounded-md text-base sm:text-sm xs:text-sm outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-inherit"
    :class="[
      ($attrs.class as string) || '',
      {
        'bg-blue-500 hover:bg-blue-600 ring-blue-600 text-white ':
          props.color === 'blue',
        'bg-yellow-500 hover:bg-yellow-600 ring-yellow-600 text-white':
          props.color === 'yellow',
        'bg-violet-500 hover:bg-violet-600 ring-violet-600 text-white':
          props.color === 'violet',
      },
      props.disabled
        ? 'cursor-not-allowed pointer-events-none opacity-50'
        : 'cursor-pointer opacity-100',
    ]"
  >
    <slot />
  </button>
</template>
