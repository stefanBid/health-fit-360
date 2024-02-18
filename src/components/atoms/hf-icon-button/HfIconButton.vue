<script setup lang="ts">
  import type { ColorVariantSettings } from '@/types/global.types';
  import { generateId } from '@/utils';
  import type { FunctionalComponent } from 'vue';
  import { EyeIcon } from '@heroicons/vue/24/solid';

  defineOptions({ inheritAttrs: false });

  interface HfIconButtonProps {
    color?: ColorVariantSettings;
    icon?: FunctionalComponent;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<HfIconButtonProps>(), {
    color: 'green',
    icon: undefined,
    disabled: false,
  });
</script>

<template>
  <button
    :id="($attrs.id as string) || `${generateId()}-button`"
    class="p-2 text-base transition-all duration-200 ease-in-out rounded-md outline-none shrink-0 w-fit focus:ring-2 focus:ring-offset-2 focus:ring-offset-inherit"
    :class="[
      ($attrs.class as string) || '',
      {
        'bg-red-500 hover:bg-red-600 ring-red-600  text-white ':
          props.color === 'red',
        'bg-green-500 hover:bg-green-600 ring-green-600 text-white':
          props.color === 'green',
        'bg-gray-200 hover:bg-gray-300 ring-gray-300 text-black':
          props.color === 'gray',
      },
      props.disabled
        ? 'cursor-not-allowed pointer-events-none opacity-50'
        : 'cursor-pointer opacity-100',
    ]"
  >
    <component
      :is="props.icon || EyeIcon"
      class="w-5 h-5 sm:w-4 sm:h-4 xs:w-4 xs:h-4 shrink-0"
    />
  </button>
</template>
