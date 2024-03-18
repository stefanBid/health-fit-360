<script setup lang="ts">
import { HfTabs } from '@/components'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

const tabs = [
	{ key: 'tab1', label: 'Tab 1', icon: ChevronRightIcon },
	{ key: 'tab2', label: 'Tab 2', icon: ChevronRightIcon },
	{ key: 'tab3', label: 'Tab 3', icon: ChevronRightIcon },
	{ key: 'tab4', label: 'Tab 4', icon: ChevronRightIcon },
	{ key: 'tab5', label: 'Tab 5', icon: ChevronRightIcon },
	{ key: 'tab6', label: 'Tab 6', icon: ChevronRightIcon },
	{ key: 'tab7', label: 'Tab 7', icon: ChevronRightIcon },
	{ key: 'tab8', label: 'Tab 8', icon: ChevronRightIcon },
	{ key: 'tab9', label: 'Tab 9', icon: ChevronRightIcon },
	{ key: 'tab10', label: 'Tab 10', icon: ChevronRightIcon },
	{ key: 'tab11', label: 'Tab 11', icon: ChevronRightIcon },
	{ key: 'tab12', label: 'Tab 12', icon: ChevronRightIcon },
	{ key: 'tab13', label: 'Tab 13', icon: ChevronRightIcon },
	{ key: 'tab14', label: 'Tab 14', icon: ChevronRightIcon },
	{ key: 'tab15', label: 'Tab 15', icon: ChevronRightIcon },
	{ key: 'tab16', label: 'Tab 16', icon: ChevronRightIcon },
	{ key: 'tab17', label: 'Tab 17', icon: ChevronRightIcon },
	{ key: 'tab18', label: 'Tab 18', icon: ChevronRightIcon },
	{ key: 'tab19', label: 'Tab 19', icon: ChevronRightIcon },
	{ key: 'tab20', label: 'Tab 20', icon: ChevronRightIcon },
	{ key: 'tab21', label: 'Tab 21', icon: ChevronRightIcon },
	{ key: 'tab22', label: 'Tab 22', icon: ChevronRightIcon },
	{ key: 'tab23', label: 'Tab 23', icon: ChevronRightIcon },
	{ key: 'tab24', label: 'Tab 24', icon: ChevronRightIcon },
	{ key: 'tab25', label: 'Tab 25', icon: ChevronRightIcon },
	{ key: 'tab26', label: 'Tab 26', icon: ChevronRightIcon },
]
</script>

<template>
  <div class="flex flex-col p-10 gap-y-8 ">
    <HfTabs
      :tabs="tabs"
      :initial-active-tab="1"
      :tabs-to-display="10"
    >
      <template #tabPanel="{ selectedTab }">
        <div>
          <p>{{ selectedTab }}</p>
        </div>
      </template>
    </HfTabs>
  </div>
</template>
