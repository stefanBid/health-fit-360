<script setup lang="ts">
import {
	HfToggle,
} from '@/components';
import {
	TrashIcon,
	XMarkIcon

} from '@heroicons/vue/24/outline';

import { ref } from 'vue';

const toggle = ref(false);

</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    <HfToggle
      v-model:enabled="toggle"
      label="Toggle"
      color="violet"
      help="This is a help text"
      :dot-icon="{ enabled: TrashIcon, disabled: XMarkIcon}"
    />
  </div>
</template>
