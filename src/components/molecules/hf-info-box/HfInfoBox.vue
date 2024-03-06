<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { InformationCircleIcon as InformationCircleIconOutline } from '@heroicons/vue/24/outline';
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
import { getTransition } from '@/utils';
import { usePopper } from '@/hooks';
import { HfIconButton } from '@/components';

export interface HfInfoBoxProps {
  text?: string;
  type?: 'solid' | 'outline';
}

const props = withDefaults(defineProps<HfInfoBoxProps>(), {
	text: 'Help text',
	type: 'outline'
});

const { isOpen, anchor, popper, popperArrow, popperStyle, popperPosition, changeToolTipVisibility } =
  usePopper('helpInfo');

const timeoutId = ref();

const handleClick = () => {
	changeToolTipVisibility('open');
};

const handleMouseLeave = () => {
	timeoutId.value = setTimeout(() => {
		changeToolTipVisibility('close');
	}, 200);
};

onUnmounted(() => {
	if (timeoutId.value !== null) {
		clearTimeout(timeoutId.value);
	}
});

const transition = getTransition('scaleAndFade');
</script>

<template>
  <div class="inline-block w-fit">
    <div
      ref="anchor"
      class="flex items-center"
      aria-describedby="tooltip"
    >
      <HfIconButton
        :icon="props.type === 'solid' ? InformationCircleIcon : InformationCircleIconOutline"
        no-style
        class="p-0 text-gray-500 transition-colors duration-200 ease-in-out size-5 hover:text-gray-700"
        type="button"
        @click.stop="handleClick"
        @mouseleave.stop="handleMouseLeave"
      />
    </div>
    <teleport to="body">
      <transition
        :enter-active-class="transition.enterActiveClass"
        :enter-from-class="transition.enterFromClass"
        :enter-to-class="transition.enterToClass"
        :leave-active-class="transition.leaveActiveClass"
        :leave-from-class="transition.leaveFromClass"
        :leave-to-class="transition.leaveToClass"
      >
        <div
          v-if="isOpen"
          ref="popper"
          :style="popperStyle"
          class="absolute z-50 p-1 text-xs text-center break-words whitespace-normal bg-white border border-gray-300 rounded-md shadow-lg w-fit max-w-48"
        >
          {{ props.text }}
          <div
            ref="popperArrow"
            role="tooltip"
            class="absolute rotate-45 bg-white border-gray-300 size-3 left-1/2"
            :class="[
              { '-bottom-1.5 -translate-x-1/2 border-b border-e': popperPosition === 'top' },
              { '-top-1.5 -translate-x-1/2 border-s border-t': popperPosition === 'bottom' },
            ]"
          ></div>
        </div>
      </transition>
    </teleport>
  </div>
</template>