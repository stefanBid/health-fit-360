<script setup lang="ts">
import {
	HfInput,
	HfToggle
} from '@/components';

import { ref } from 'vue';
const input = ref('text');
const enabled = ref(false);
</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    <HfInput
      v-model:input-value="input"
      color="violet"
      type="number"
      unit="cm"
      label="Input"
      help="This is a help text"
      :disabled="!enabled"
    >
      <template #toggle>
        <HfToggle
          v-model:enabled="enabled"
        />
      </template>
    </HfInput>
  </div>
</template>
