<script setup lang="ts">
import {
	HfIconButton,
} from '@/components';
import {
	TrashIcon,

} from '@heroicons/vue/24/outline';

</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 bg-slate-800">
    <HfIconButton
      color="gray"
      no-style
      class="p-2 transition-all duration-300 ease-in-out bg-red-500 rounded-md hover:rotate-180 hover:text-white w-fit"
      :icon="TrashIcon"
    />
  </div>
</template>
