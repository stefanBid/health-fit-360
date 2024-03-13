<script setup lang="ts">
import { usePopper } from '@/hooks';
import { getTransition } from '@/utils';
import { vOnClickOutside } from '@vueuse/components';
import { HfIconButton } from '@/components';
import { Bars3CenterLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { computed, type FunctionalComponent } from 'vue';

interface MenuOption {
  optionKey: string;
  optionLabel: string;
  icon?: FunctionalComponent;
}

interface HfDropdownMenuProps {
  options?: MenuOption[];
  menuIcon?: FunctionalComponent;
  disabled?: boolean;
  onSendOption?: (option: string) => void;
}

const props = withDefaults(defineProps<HfDropdownMenuProps>(), {
	options: undefined,
	menuIcon: undefined,
	disabled: false,
	onSendOption: undefined,
});

const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } =
  usePopper('dropdownMenu');

const transition = getTransition('scaleAndFade');

const getMenuIcon = computed(() => props.menuIcon || Bars3CenterLeftIcon);

const handleClick = () => {
	if (isOpen.value) {
		changeToolTipVisibility('close');
		return;
	}
	changeToolTipVisibility('open');
};

const handleClickOption = (option: string) => {
	if (props.onSendOption) {
		props.onSendOption(option);
	}
	changeToolTipVisibility('close');
};
</script>

<template>
  <div class="inline-block w-fit">
    <div
      ref="anchor"
      class="flex items-center"
      aria-describedby="tooltip"
    >
      <hf-icon-button
        :icon="getMenuIcon"
        no-style
        :disabled="props.disabled"
        class="p-2 text-black transition-all duration-200 ease-in-out bg-gray-200 border rounded-md hover:bg-gray-300 active:scale-95"
        type="button"
        @click="handleClick"
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
          v-on-click-outside="[
            () => changeToolTipVisibility('close'),
            { ignore: [anchor] },
          ]"
          :style="popperStyle"
          class="absolute z-50 flex flex-col w-40 p-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <slot v-if="!props.options"></slot>
          <div
            v-else
            class="flex flex-col w-full gap-y-1.5"
          >
            <div
              v-for="option in props.options"
              :key="option.optionKey"
              class="flex items-center p-2 text-black rounded-md gap-x-1.5 hover:cursor-pointer hover:bg-slate-100"
              @click="handleClickOption(option.optionKey)"
            >
              <component
                :is="option.icon ? option.icon : ChevronRightIcon"
                class="transition-all duration-200 ease-in-out size-5 sm:size-4 xs:size-4 shrink-0"
              />
              <span
                class="flex-1 text-sm truncate transition-all ease-in-out sm:text-xs xs:text-xs dutarion-200"
              >
                {{ option.optionLabel }}
              </span>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
