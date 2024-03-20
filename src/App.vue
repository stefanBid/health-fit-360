<script setup lang="ts">
import { HfIconButton, HfTabs } from '@/components'
import { ClipboardDocumentListIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { Option } from './types/global.types';
import { ref } from 'vue';

const tabs = ref<Option[]>([
	{ key: 'tab1', label: 'Anagrafica', icon: UserCircleIcon },
	{ key: 'tab2', label: 'Step Test', icon: ClipboardDocumentListIcon },
]);

const handleAddNewTab = () => {
	tabs.value.push({ key: `tab${tabs.value.length + 1}`, label: `Tab ${tabs.value.length + 1}`, icon: ClipboardDocumentListIcon });
};

</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    <HfTabs
      color="violet"
      :tabs="tabs"
      :initial-active-tab="1"
      :tabs-to-display="5"
    >
      <template #other>
        <HfIconButton
          :icon="PlusCircleIcon"
          color="green"
          @click="handleAddNewTab"
        />
      </template>
      <template #tabPanel="{ selectedTab }">
        <div>
          <p>{{ selectedTab }}</p>
        </div>
      </template>
    </HfTabs>
  </div>
</template>
