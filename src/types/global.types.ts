import type { FunctionalComponent } from 'vue';

export type ColorVariantSettings = 'green' | 'red' | 'gray';

export type ColorVariantExtra = 'blue' | 'yellow' | 'violet';

export type SizeVariant = 'small' | 'base' | 'large';

// INTERFACES

export interface Option {
  key: string;
  label: string;
  icon?: FunctionalComponent;
}
