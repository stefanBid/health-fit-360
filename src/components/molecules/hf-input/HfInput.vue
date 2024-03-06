<script setup lang="ts">
import { generateId } from '@/utils';
import type { ColorVariantExtra } from '@/types/global.types';

interface HfInputProps {
  color?: ColorVariantExtra;
  type?: 'text' | 'number';
  unit?: 'cm' | 'bpm';
  label?: string;
  help?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<HfInputProps>(), {
	color: 'blue',
	type: 'text',
	unit: undefined,
	label: undefined,
	help: undefined,
	placeholder: 'Insert text here...',
	disabled: false,
});

const inputValue = defineModel<string | number>('inputValue', {
	required: true,
});

defineOptions({ inheritAttrs: false });

const inputId = `input-${generateId()}`;

const UNIT_MAP = {
	cm: 'cm',
	bpm: 'bpm',
};
</script>

<template>
  <div class="flex flex-col gap-y-1.5">
    <div class="inline-flex items-center">
      <slot name="toggle"></slot>
      <label
        v-if="props.label"
        :for="($attrs.id as string) || inputId"
        class="ml-1.5 hover:cursor-pointer text-sm sm:text-xs xs:text-xs"
      >
        {{ props.label }}
      </label>
      <!--Help icon-->
    </div>
    <div class="relative text-sm xs:text-xs sm:text-xs">
      <input
        :id="($attrs.id as string) || inputId"
        v-model="inputValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        class="w-full py-2 pl-2 truncate transition-all duration-200 ease-in-out border border-gray-300 rounded-md outline-none bg-slate-100 focus:outline-none focus:ring-1"
        :class="[
          {
            'border-gray-400': !props.disabled,
            'focus:ring-blue-500 hover:border-blue-500':
              !props.disabled && props.color === 'blue',
            'focus:ring-yellow-500 focus:border-yellow-500 hover:border-yellow-500':
              !props.disabled && props.color === 'yellow',
            'focus:ring-violet-500 hover:border-violet-500':
              !props.disabled && props.color === 'violet',
            'text-black/50': props.disabled,
            'opacity-60': props.disabled,
            'pr-10': props.unit,
            'pr-2': !props.unit,
          },
        ]"
      />
      <div class="absolute inset-y-0 right-0 flex items-center m-2">
        <span
          v-if="props.unit"
          class="text-gray-500"
        >
          {{ UNIT_MAP[props.unit] }}
        </span>
      </div>
    </div>
  </div>
</template>
