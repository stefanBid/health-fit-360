<script setup lang="ts">
import type { ColorVariantExtra } from '@/types/global.types';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { HfInfoBox } from '@/components';
import { FunctionalComponent } from 'vue';

defineOptions({ inheritAttrs: false });

interface HfToggleProps {
  label?: string;
  help?: string;
  color?: ColorVariantExtra;
  dotIcon?: {
    enabled: FunctionalComponent;
    disabled: FunctionalComponent;
  };
}

const props = withDefaults(defineProps<HfToggleProps>(), {
	label: undefined,
	help: undefined,
	color: 'blue',
	dotIcon: undefined,
});
const enabled = defineModel<boolean>('enabled', { required: true });
</script>

<template>
  <SwitchGroup>
    <div class="inline-flex items-center">
      <Switch
        :id="($attrs.id as string) || undefined"
        v-model="enabled"
        :class="[
          {
            'bg-blue-500': props.color === 'blue' && enabled,
            'bg-blue-500/50': props.color === 'blue' && !enabled,
          },
          {
            'bg-yellow-500': props.color === 'yellow' && enabled,
            'bg-yellow-500/50': props.color === 'yellow' && !enabled,
          },
          {
            'bg-violet-500': props.color === 'violet' && enabled,
            'bg-violet-500/50': props.color === 'violet' && !enabled,
          },
        ]"
        class="relative inline-flex h-[1.5rem] w-[3rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0"
      >
        <span class="sr-only">Use setting</span>
        <div
          aria-hidden="true"
          :class="enabled ? 'translate-x-[1.5rem]' : 'translate-x-0'"
          class="pointer-events-none inline-flex items-center justify-center size-[1.25rem] rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out"
        >
          <component
            :is="enabled ? props.dotIcon.enabled : props.dotIcon.disabled"
            v-if="props.dotIcon"
            class="transition-all duration-200 ease-in-out size-3"
          />
        </div>
      </Switch>

      <div
        v-if="props.label || props.help"
        class="inline-flex items-center ml-2 gap-x-0.5"
      >
        <SwitchLabel
          v-if="props.label"
          :id="($attrs.id as string) || undefined"
          class="text-sm transition-all duration-200 ease-in-out sm:text-xs xs:text-xs hover:cursor-pointer"
        >
          {{ props.label }}
        </SwitchLabel>
        <HfInfoBox
          v-if="props.help"
          :text="props.help"
        />
      </div>
    </div>
  </SwitchGroup>
</template>
