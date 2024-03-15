<script setup lang="ts">
import { getTransition } from '@/utils';
import { HfIconButton } from '@/components';
import { SizeVariant } from '@/types/global.types';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/vue'

import { XMarkIcon } from '@heroicons/vue/24/solid';

interface HfDialogProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  size?: SizeVariant | 'full';
  onClose: (closeValue:boolean) => void;
}

const props = withDefaults(defineProps<HfDialogProps>(), {
	title: undefined,
	subtitle: undefined,
	size: 'base',
});

const closeModal = () => {
	props.onClose(false);
};

const transitionBg = getTransition('fade');
const transitionDialog = getTransition('scaleAndFade');

</script>

<template>
  <TransitionRoot
    appear
    :show="props.isOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        :enter="transitionBg.enterActiveClass"
        :enter-from="transitionBg.enterFromClass"
        :enter-to="transitionBg.enterToClass"
        :leave="transitionBg.leaveActiveClass"
        :leave-from="transitionBg.leaveFromClass"
        :leave-to="transitionBg.leaveToClass"
      >
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center"
        >
          <TransitionChild
            as="template"
            :enter="transitionDialog.enterActiveClass"
            :enter-from="transitionDialog.enterFromClass"
            :enter-to="transitionDialog.enterToClass"
            :leave="transitionDialog.leaveActiveClass"
            :leave-from="transitionDialog.leaveFromClass"
            :leave-to="transitionDialog.leaveToClass"
          >
            <DialogPanel
              class="w-full p-6 overflow-hidden transition-all transform bg-white rounded-md shadow-xl"
              :class="[
                {
                  'max-w-[40rem]': props.size === 'small',
                  'max-w-[60rem]': props.size === 'base',
                  'max-w-[80rem]': props.size === 'large',
                  'max-w-full': props.size === 'full',
                }
              ]"
            >
              <div class="flex items-start justify-between w-full gap-x-2 ">
                <span class="flex-1 text-left truncate">
                  <DialogTitle
                    v-if="props.title"
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 truncate whitespace-normal transition-all duration-200 ease-in-out sm:text-base xs:text-base"
                  >
                    {{ props.title }}
                  </DialogTitle>

                  <DialogTitle
                    v-if="props.subtitle"
                    as="p"
                    class="block text-sm font-medium leading-6 text-gray-400 truncate whitespace-normal transition-all duration-200 ease-in-out sm:text-xs xs:text-xs"
                  >
                    {{ props.subtitle }}
                  </DialogTitle>
                </span>
                <HfIconButton
                  :icon="XMarkIcon"
                  color="gray"
                  class="flex-none hover:rotate-180"
                  @click="closeModal"
                />
              </div>
              <div class="mt-2">
                <slot name="body-content">
                </slot>
              </div>

              <div class="mt-4">
                <slot name="footer-content">
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
