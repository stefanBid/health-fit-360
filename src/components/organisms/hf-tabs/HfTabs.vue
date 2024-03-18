<script setup lang="ts">
// TODO: Add breackpoints for tabs to display
// TOD: Add button for add new tab

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import type { ColorVariantExtra, Option } from '@/types/global.types';
import { HfButton, HfDropdownMenu } from '@/components';
import { useGlobalBreakpoints } from '@/hooks';
import { computed, ref } from 'vue';

interface HfTabsProps {
  tabs: Option[];
  initialActiveTab?: number;
  tabsToDisplay?: 1 | 3 | 5 | 10;
  color?: ColorVariantExtra
}

const props = withDefaults(defineProps<HfTabsProps>(), {
	initialActiveTab: 0,
	tabsToDisplay: 5,
	color: 'blue',
});

const selectedTab = ref(props.initialActiveTab || 0);

const { xs, sm } = useGlobalBreakpoints();

const handleSelectTab = (tabKey: string) => {
	const tabIdx = props.tabs.findIndex((tab) => tab.key === tabKey);
	selectedTab.value = tabIdx;
	console.log(tabIdx);
};

const getTabsToDisplay = computed(() => {
	if (xs.value || sm.value) return props.tabs.slice(0, 1);
	if (props.tabs.length <= props.tabsToDisplay) return props.tabs;
	else return props.tabs.slice(0, props.tabsToDisplay);
});

const getOtherTabs = computed(() => {
	if (props.tabs.length <= props.tabsToDisplay) return [];
	else return props.tabs.slice(props.tabsToDisplay);
});

const showMenuTabs = computed(() => props.tabs.length > props.tabsToDisplay);

</script>

<template>
  <div
    class="w-full "
    v-bind="$attrs"
  >
    <TabGroup
      :default-index="initialActiveTab"
      :selected-index="selectedTab"
    >
      <TabList class="flex items-center p-2 bg-gray-100 border border-gray-100 rounded-md gap-x-4">
        <Tab
          v-for="(tab, idx) in getTabsToDisplay"
          :key="tab.key"
          as="template"
        >
          <HfButton
            no-style
            :class="[
              'flex-1 rounded-md p-2 text-sm font-medium leading-5 inline-flex items-center justify-center gap-x-1 transition-all duration-200 ease-in-out truncate',
              '  focus:outline-none border-2 ',
              selectedTab === idx
                ? 'bg-white text-blue-500 shadow border-blue-500 '
                : 'text-black hover:bg-gray-300 hover:text-white  border-gray-300',
            ]"
            @click="handleSelectTab(tab.key)"
          >
            {{ tab.label }}
            <component
              :is="tab.icon"
              v-if="tab.icon"
              class="size-5"
            />
          </HfButton>
        </Tab>
        <Tab
          v-if="showMenuTabs"
          as="template"
        >
          <HfDropdownMenu
            :options="getOtherTabs"
            :on-send-option="option => handleSelectTab(option)"
          />
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="tab in props.tabs"
          :key="tab.key"
          class="w-full bg-transparent border h-fit"
        >
          <slot
            name="tabPanel"
            :selected-tab="selectedTab"
          ></slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
