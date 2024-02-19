<script setup lang="ts">
  import { usePopper } from '@/hooks';
  import { getTransition } from '@/utils';
  import { vOnClickOutside } from '@vueuse/components';
  import { HfIconButton } from '@/components';
  import { Bars3CenterLeftIcon } from '@heroicons/vue/24/solid';

  interface HfDropdownMenuProps {
    contentData?: any;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<HfDropdownMenuProps>(), {
    contentData: undefined,
    disabled: false,
  });

  const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } =
    usePopper('dropdownMenu');

  const transition = getTransition('scaleAndFade');

  const handleClick = () => {
    console.log('click');
    if (isOpen.value) {
      changeToolTipVisibility('close');
      return;
    }
    changeToolTipVisibility('open');
  };
</script>

<template>
  <div
    ref="anchor"
    class="inline-flex items-center w-fit"
    aria-describedby="tooltip"
  >
    <hf-icon-button
      :icon="Bars3CenterLeftIcon"
      :on-click="handleClick"
      no-style
      :disabled="props.disabled"
      class="p-2 text-black bg-gray-200 border rounded-md active:scale-95"
      type="button"
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
        class="absolute z-50 flex flex-col w-40 p-2 text-white border border-gray-300 rounded-md shadow-lg"
      >
        <slot :data="props.contentData" />
      </div>
    </transition>
  </teleport>
</template>
