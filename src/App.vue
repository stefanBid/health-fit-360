<script setup lang="ts">
import {
	HfButton,
} from '@/components';
import {
	TrashIcon,

} from '@heroicons/vue/24/outline';

</script>

<template>
  <div class="flex flex-col p-10 gap-y-8">
    <HfButton
      color="yellow"
      size="custom"
      class="w-64"
    >
      Button sjdhkjshdkjhsdh dfdfdf
      <trash-icon class="w-5 h-5" />
    </HfButton>
  </div>
</template>
