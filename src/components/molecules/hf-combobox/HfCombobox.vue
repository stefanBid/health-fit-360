<script setup lang="ts">
import {
	ref,
	nextTick,
	computed,
	onUnmounted,
	onMounted,
	onBeforeMount,
} from 'vue';
import { generateId, getTransition } from '@/utils';
import { useFocus } from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { usePopper } from '@/hooks/usePopper';
import type { ColorVariantExtra } from '@/types/global.types';
import HfIconButton from '@/components/atoms/hf-icon-button/HfIconButton.vue';

interface ComboboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  label?: string;
  help?: string;
  placeholder?: string;
  disabled?: boolean;
  valueKey?: string;
  displayKey?: string;
  color?: ColorVariantExtra;
  addIfNotFoundEnabled?: boolean;
}

interface ItemOption {
  label: string;
  value: string;
  notFound: boolean;
}
const props = withDefaults(defineProps<ComboboxProps>(), {
	label: undefined,
	help: undefined,
	disabled: false,
	placeholder: 'Insert text here...',
	valueKey: '',
	displayKey: '',
	color: 'blue',
	addIfNotFoundEnabled: false,
});

defineOptions({ inheritAttrs: false });

const valueSelected = defineModel<string>('valueSelected', { required: true });
const newItems = ref<ItemOption[]>([]);
const query = ref('');
const selectableOption = ref('');

const comboboxUniqueId: string = generateId();
const comboboxInputRef = ref();
const transition = getTransition('scaleAndFade');

let resizeObserver: ResizeObserver | null = null;
const { focused } = useFocus(comboboxInputRef);
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } =
  usePopper('combobox');

const inputValue = computed({
	get: () => {
		if (isOpen.value) {
			return query.value;
		}
		return selectableOption.value;
	},
	set: (val) => {
		query.value = val;
	},
});

const onOpenCloseCombobox = (op: 'open' | 'close') => {
	changeToolTipVisibility(op);
	if (op === 'close') {
		focused.value = false;
	} else {
		focused.value = true;
		query.value = '';
	}

	nextTick(() => {
		if (anchor.value && popper.value) {
			const anchorWidth = anchor.value.offsetWidth;
			popper.value.style.width = `${anchorWidth}px`;
		}
	});
};

const normalizedPropsItems = computed<ItemOption[]>(() =>
	props.items.map((item) => ({
		label: item[props.displayKey],
		value: item[props.valueKey],
		notFound: false,
	})),
);

const filteredItemsOption = computed<ItemOption[]>(() => {
	const combinedItems = [...normalizedPropsItems.value, ...newItems.value];

	const filtered = combinedItems.filter((item) =>
		item.label.toLowerCase().includes(query.value.toLowerCase()),
	);

	if (
		props.addIfNotFoundEnabled &&
    filtered.length === 0 &&
    query.value.trim() !== ''
	) {
		filtered.push({
			label: query.value,
			value: query.value,
			notFound: true,
		});
	}

	return filtered;
});

const onSelectComboboxItemOption = (item: ItemOption) => {
	if (item.notFound && newItems.value.indexOf(item) === -1) return;

	if (selectableOption.value !== item.label) {
		valueSelected.value = item.value;
		selectableOption.value = item.label;
		onOpenCloseCombobox('close');
	} else {
		valueSelected.value = '';
		selectableOption.value = '';
	}
};

const addNewItemOption = (newItem: ItemOption) => {
	const isDuplicate = newItems.value.some(
		(item) => item.value === newItem.value,
	);
	if (isDuplicate) return;

	newItems.value.push({
		...newItem,
		notFound: false,
	});

	valueSelected.value = newItem.value;
	selectableOption.value = newItem.label;
	onOpenCloseCombobox('close');
};

onMounted(() => {
	if (anchor.value) {
		resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const { width } = entry.contentRect;
				if (popper.value) {
					popper.value.style.width = `${width}px`;
				}
			});
		});

		resizeObserver.observe(anchor.value);
	}
});

onBeforeMount(() => {
	if (valueSelected.value) {
		const selectedItem = props.items.find(
			(item) => item[props.valueKey] === valueSelected.value,
		);
		if (selectedItem) {
			selectableOption.value = selectedItem[props.displayKey];
		} else {
			selectableOption.value = valueSelected.value;
			newItems.value.push({
				label: valueSelected.value,
				value: valueSelected.value,
				notFound: true,
			});
		}
	}
});

onUnmounted(() => {
	// Interrompe l'osservazione e pulisce il ResizeObserver quando il componente viene distrutto
	if (resizeObserver && anchor.value) {
		resizeObserver.unobserve(anchor.value);
		resizeObserver.disconnect();
		resizeObserver = null;
	}
});
</script>

<template>
  <div class="flex flex-col">
    <!--Label-->
    <div class="inline-flex items-center mb-1.5">
      <slot name="toggle"></slot>
      <label
        v-if="props.label"
        :for="($attrs.id as string) || `${comboboxUniqueId}-id`"
        class="ml-1.5 hover:cursor-pointer text-sm sm:text-xs xs:text-xs"
      >
        {{ props.label }}
      </label>
      <!--Help icon-->
    </div>
    <!--Combobox-->
    <div
      ref="anchor"
      class="relative flex items-center w-full text-sm xs:text-xs sm:text-xs"
    >
      <input
        :id="($attrs.id as string) || `${comboboxUniqueId}-id`"
        ref="comboboxInputRef"
        v-model="inputValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        class="w-full p-2 truncate transition-all duration-200 ease-in-out border border-gray-300 rounded-md outline-none bg-slate-100 focus:outline-none focus:ring-1"
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
          },
        ]"
        @click="!isOpen ? onOpenCloseCombobox('open') : undefined"
      />
      <HfIconButton
        :icon="ChevronDownIcon"
        no-style
        :disabled="props.disabled"
        :class="{ 'rotate-180': isOpen }"
        class="absolute inset-y-0 right-0 flex items-center m-2 bg-transparent w-fit"
        @click.stop="onOpenCloseCombobox(isOpen ? 'close' : 'open')"
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
          class="absolute z-50 w-full overflow-y-auto text-sm bg-white border border-gray-300 rounded-md shadow-lg h-fit max-h-72 xs:text-xs sm:text-xs"
        >
          <div
            v-if="filteredItemsOption.length === 0"
            class="relative px-4 py-2 italic cursor-default select-none text-kl-gray-400"
          >
            Nothing found.
          </div>

          <div
            v-for="(item, index) in filteredItemsOption"
            :key="item.value"
            class="text-black transition-all duration-200 ease-in-out group"
            :class="{
              'bg-white hover:text-white':
                valueSelected !== item.value &&
                (!item.notFound || newItems.includes(item)),
              'bg-white':
                valueSelected !== item.value &&
                item.notFound &&
                !newItems.includes(item),
              ' hover:bg-blue-500 ':
                valueSelected !== item.value &&
                props.color === 'blue' &&
                (!item.notFound || newItems.includes(item)),
              ' hover:bg-yellow-500 ':
                valueSelected !== item.value &&
                props.color === 'yellow' &&
                (!item.notFound || newItems.includes(item)),
              ' hover:bg-violet-500':
                valueSelected !== item.value &&
                props.color === 'violet' &&
                (!item.notFound || newItems.includes(item)),
              'bg-blue-500 text-white':
                valueSelected === item.value && props.color === 'blue',
              'bg-yellow-500 text-white':
                valueSelected === item.value && props.color === 'yellow',
              'bg-violet-500 text-white':
                valueSelected === item.value && props.color === 'violet',
              'hover:cursor-pointer': !item.notFound || newItems.includes(item),
              'rounded-t-md': index === 0,
              'rounded-b-md': index === filteredItemsOption.length - 1,
            }"
            @click="onSelectComboboxItemOption(item)"
          >
            <span class="inline-flex items-center p-2 gap-x-1">
              <PlusCircleIcon
                v-if="item.notFound && !newItems.includes(item)"
                class="size-6 shrink-0 rounded-md p-0.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-white"
                :class="{
                  'hover:bg-blue-500': props.color === 'blue',
                  'hover:bg-yellow-500': props.color === 'yellow',
                  'hover:bg-violet-500': props.color === 'violet',
                }"
                @click.stop="addNewItemOption(item)"
              />
              <p
                class="flex-1 text-sm truncate xs:text-xs sm:text-xs"
                :class="{ italic: item.notFound && !newItems.includes(item) }"
              >
                {{
                  item.notFound && !newItems.includes(item)
                    ? `Add "${item.label}"`
                    : item.label
                }}
              </p>
            </span>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
