<script setup lang="ts">
import { ref, useSlots, nextTick, computed, onUnmounted, onMounted, onBeforeMount, watch } from 'vue';
import { useFocus, useDebounce } from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';
import { HfIconButton, HfInfoBox } from '@/components';
import { ChevronDownIcon, PlusCircleIcon, CheckCircleIcon as CheckCircleIconOutline, ArrowPathIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { usePopper } from '@/hooks';
import { getTransition, generateId } from '@/utils';
import type { ColorVariantExtra } from '@/types/global.types';

interface HfComboboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  label?: string;
  help?: string;
  placeholder?: string;
  color?: ColorVariantExtra;
  disabled?: boolean;
  valueKey?: string;
  displayKey?: string;
  addIfNotFoundOption?: boolean;
  multiple?: boolean;
}

interface ItemOption {
  label: string;
  value: string;
  selected: boolean;
}

const props = withDefaults(defineProps<HfComboboxProps>(), {
	label: undefined,
	help: undefined,
	disabled: false,
	placeholder: '',
	color: 'blue',
	valueKey: '',
	displayKey: '',
	addIfNotFoundOption: false,
	multiple: false,
});

defineOptions({ inheritAttrs: false });

const selectedOption = defineModel<string | string[]>('selectedOption', { required: true });
const newItems = ref<ItemOption[]>([]);

const query = ref<string>('');
const queryDebounced = useDebounce(query, 300);
const isWaitingForDebounce = ref(false);

const slots = useSlots();
const comboboxUniqueId = generateId();
const comboboxInputRef = ref();
const transition = getTransition('scaleAndFade');

let resizeObserver: ResizeObserver | null = null;
const { focused } = useFocus(comboboxInputRef);
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = usePopper('combobox');

const onOpenCloseCombobox = (op: 'open' | 'close') => {
	changeToolTipVisibility(op);
	query.value = '';
	if (op === 'close')
		focused.value = false;
	else
		focused.value = true;

	nextTick(() => {
		if (anchor.value && popper.value) {
			const anchorWidth = anchor.value.offsetWidth;
			popper.value.style.width = `${anchorWidth}px`;
		}
	});
};

const normalizedPropsItems = (): ItemOption[] => {
	if (!props.multiple && !Array.isArray(selectedOption.value)) {
		return props.items.map(item => ({
			label: item[props.displayKey] as string,
			value: item[props.valueKey] as string,
			selected: selectedOption.value === (item[props.valueKey] as string),
		}));
	}
	if (props.multiple && Array.isArray(selectedOption.value)) {
		return props.items.map(item => ({
			label: item[props.displayKey] as string,
			value: item[props.valueKey] as string,
			selected: selectedOption.value.includes(item[props.valueKey] as string),
		}));
	}
	return [];
};

const filteredItemsOption = computed<ItemOption[]>(() => {
	const filtered = newItems.value.filter(item => item.label.toLowerCase().includes(queryDebounced.value.toLowerCase()));

	return filtered;
});

const inputValue = computed({
	get: () => {
		// If the combobox is open, display the current query
		if (isOpen.value) {
			return query.value;
		}

		// If the combobox is closed, determine what value to display based on the selection
		if (!props.multiple) {
			// Single selection mode
			const selectedItem = newItems.value.find(item => item.value === selectedOption.value);
			return selectedItem ? selectedItem.label : '';
		}
		// Multiple selection mode (optional, depends on how you want to display selected values)
		const selectedItems = newItems.value.filter(item => selectedOption.value.includes(item.value));
		// An example: concatenate labels of selected items with a comma
		return selectedItems.map(item => item.label).join(', ');
	},
	set: val => {
		// Update the query based on the user input
		query.value = val;
	},
});

const onSelectComboboxItemOption = (itemOption: ItemOption) => {
	const itemIndexInNewItems = newItems.value.findIndex(item => item.value === itemOption.value);

	if (itemIndexInNewItems !== -1) {
		newItems.value[itemIndexInNewItems].selected = !newItems.value[itemIndexInNewItems].selected;

		if (!props.multiple && !Array.isArray(selectedOption.value)) {
			// Single selection: update selectedOption or clear it if the item was deselected
			selectedOption.value = newItems.value[itemIndexInNewItems].selected ? itemOption.value : '';

			// Remove the selected state from all other items
			newItems.value.forEach((_, index) => {
				if (index !== itemIndexInNewItems) {
					newItems.value[index].selected = false;
				}
			});
		} else if (props.multiple && Array.isArray(selectedOption.value)) {
			// Multiple selection: update selectedOption by adding or removing the item
			if (newItems.value[itemIndexInNewItems].selected) {
				selectedOption.value.push(itemOption.value);
			} else {
				selectedOption.value = selectedOption.value.filter((value: string) => value !== itemOption.value);
			}
		}
	}

	onOpenCloseCombobox('close'); // Close the combobox after selection/deselection
};

const addNewItemOption = (newItem: string) => {
	const isDuplicate = newItems.value.some(item => item.value === newItem);
	if (isDuplicate) return;

	newItems.value.push({
		label: newItem,
		value: newItem,
		selected: true,
	});
	if (!props.multiple && !Array.isArray(selectedOption.value)) {
		selectedOption.value = newItem;

		// Remove the selected state from all other items
		newItems.value.forEach((item, index) => {
			if (item.value !== newItem) {
				newItems.value[index].selected = false;
			}
		});
	} else if (props.multiple && Array.isArray(selectedOption.value)) {
		selectedOption.value.push(newItem);
	}
	onOpenCloseCombobox('close');
};

watch([query, queryDebounced], () => {
	if (query.value !== queryDebounced.value) {
		isWaitingForDebounce.value = true;
	}
	if (query.value === queryDebounced.value) {
		isWaitingForDebounce.value = false;
	}
});

onBeforeMount(() => {
	newItems.value = normalizedPropsItems();

	if (!props.multiple && !Array.isArray(selectedOption.value) && selectedOption.value !== '') {
		const valueExists = newItems.value.some(item => item.value === selectedOption.value);
		if (!valueExists) {
			newItems.value.push({
				label: selectedOption.value as string,
				value: selectedOption.value as string,
				selected: true,
			});
		}
	} else if (props.multiple && Array.isArray(selectedOption.value) && selectedOption.value.length > 0) {
		selectedOption.value.forEach((value: string) => {
			const valueExists = newItems.value.some(item => item.value === value);
			if (!valueExists) {
				newItems.value.push({
					label: value,
					value,
					selected: true,
				});
			}
		});
	}
});

onMounted(() => {
	if (anchor.value) {
		// Crea un'istanza di ResizeObserver
		resizeObserver = new ResizeObserver(entries => {
			// eslint-disable-next-line no-restricted-syntax
			entries.forEach(entry => {
				const { width } = entry.contentRect;
				// Aggiorna la larghezza del popper per corrispondere a quella dell'anchor
				if (popper.value) {
					popper.value.style.width = `${width}px`;
				}
			});
		});

		// Inizia a osservare l'elemento anchor
		resizeObserver.observe(anchor.value);
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
  <div class="w-full space-y-2">
    <!--Label-->
    <div
      v-if="props.label || props.help || slots.toggle"
      class="inline-flex items-center w-fit"
    >
      <slot name="toggle"></slot>

      <label
        v-if="props.label"
        :for="($attrs.id as string) || `${comboboxUniqueId}-id`"
        class="text-sm transition-all duration-200 ease-in-out hover:cursor-pointer sm:text-xs xs:text-xs shrink-0"
        :class="[
          slots.toggle ? 'ml-2' : 'ml-0',
          props.disabled ? 'pointer-events-none opacity-40' : 'hover:cursor-pointer opacity-100'
        ]"
      >
        {{ props.label }}
      </label>
      <HfInfoBox
        v-if="props.help"
        :text="props.help"
        class="ml-0.5"
      />
    </div>
    <!--Combobox-->
    <div
      ref="anchor"
      class="relative flex items-center w-full text-sm xs:text-xs sm:text-xs"
      aria-describedby="tooltip"
    >
      <!--Input-Combobox-->
      <input
        :id="($attrs.id as string) || `${comboboxUniqueId}-id`"
        ref="comboboxInputRef"
        v-model="inputValue"
        :placeholder="props.placeholder"
        class="w-full py-2 pl-2 pr-8 truncate transition-all duration-200 ease-in-out border border-gray-300 rounded-md outline-none bg-slate-100 focus:outline-none focus:ring-1"
        :class="[
          {
            'border-gray-400': !props.disabled,
            'focus:ring-blue-500 hover:border-blue-500':
              !props.disabled && props.color === 'blue',
            'focus:ring-yellow-500 focus:border-yellow-500 hover:border-yellow-500':
              !props.disabled && props.color === 'yellow',
            'focus:ring-violet-500 hover:border-violet-500':
              !props.disabled && props.color === 'violet',
            'text-black/50 opacity-60 pointer-events-none': props.disabled,
          },
        ]"
        @click="!isOpen ? onOpenCloseCombobox('open') : undefined"
      />
      <HfIconButton
        :icon="ChevronDownIcon"
        no-style
        class="absolute inset-y-0 right-0 flex items-center p-2 transition-all duration-200 ease-in-out bg-transparent border-none w-fit"
        :class="[
          props.disabled ? 'pointer-events-none opacity-40' : 'opacity-100',
          isOpen ? 'rotate-180' : '',
        ]"
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
          v-on-click-outside="[() => changeToolTipVisibility('close'), { ignore: [anchor] }]"
          :style="popperStyle"
          class="absolute z-50 w-full overflow-y-auto text-sm bg-white border border-gray-300 rounded-md shadow-lg max-h-60 h-fit xs:text-xs sm:text-xs"
        >
          <template v-if="isWaitingForDebounce">
            <div class="flex items-center p-2">
              <ArrowPathIcon class="text-gray-500 size-6 animate-spin" />
              <p class="ml-2 text-gray-500">
                Loading...
              </p>
            </div>
          </template>
          <template v-else>
            <!--Options-->
            <div
              v-for="(item, index) in filteredItemsOption"
              :key="item.value"
              class="relative flex p-2 text-black transition-all duration-200 ease-in-out bg-white hover:cursor-pointer hover:text-white group"
              :class="{

                'hover:bg-blue-500': props.color === 'blue',
                'hover:bg-yellow-500': props.color === 'yellow',
                'hover:bg-violet-500': props.color === 'violet',

                'font-semibold': item.selected,
                'text-blue-500': item.selected && props.color === 'blue',
                'text-yellow-500': item.selected && props.color === 'yellow',
                'text-violet-500': item.selected && props.color === 'violet',

                'rounded-t-md': index === 0,
                'rounded-b-md': index === filteredItemsOption.length - 1,
              }"
              @click="onSelectComboboxItemOption(item)"
            >
              <span
                class="absolute inset-y-0 left-0 flex items-center justify-center p-2 bg-transparent border-none w-fit"
              >
                <component
                  :is="item.selected ? CheckCircleIcon : CheckCircleIconOutline"
                  class="transition-all duration-200 ease-in-out size-6 sm:size-5 xs:size-5 group-hover:text-white"
                  :class="[
                    {
                      'text-black': !item.selected,
                      'text-blue-500': item.selected && props.color === 'blue',
                      'text-yellow-500': item.selected && props.color === 'yellow',
                      'text-violet-500': item.selected && props.color === 'violet',
                    },
                  ]"
                />
              </span>

              <p class="flex-1 pl-8 truncate">
                {{ item.label }}
              </p>
            </div>
            <!--Add new item option or no option-->
            <div
              v-if="filteredItemsOption.length === 0"
              class="inline-flex items-center w-full p-2 gap-x-1"
            >
              <PlusCircleIcon
                v-if="props.addIfNotFoundOption"
                class="transition-all duration-200 ease-in-out rounded-md size-6 shrink-0 hover:cursor-pointer hover:text-white"
                :class="[
                  {
                    'hover:bg-blue-500': props.color === 'blue',
                    'hover:bg-yellow-500': props.color === 'yellow',
                    'hover:bg-violet-500': props.color === 'violet',
                  },
                ]"
                @click.stop="addNewItemOption(query)"
              />
              <p class="flex-1 italic truncate cursor-default select-none">
                {{ props.addIfNotFoundOption ? `Add "${query}"` : 'Nothing found' }}
              </p>
            </div>
          </template>
        </div>
      </transition>
    </teleport>
  </div>
</template>
