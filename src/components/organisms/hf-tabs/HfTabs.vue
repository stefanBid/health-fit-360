<script setup lang="ts">

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import type { ColorVariantExtra, Option } from '@/types/global.types';
import { HfButton, HfDropdownMenu } from '@/components';
import { useGlobalBreakpoints } from '@/hooks';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';

interface HfTabsProps {
  tabs: Option[];
  initialActiveTab?: number;
  tabsToDisplay?: 1 | 3 | 5 ;
  color?: ColorVariantExtra
}

const props = withDefaults(defineProps<HfTabsProps>(), {
	initialActiveTab: 0,
	tabsToDisplay: 5,
	color: 'blue',
});

const selectedTab = ref(props.tabs[props.initialActiveTab].key || props.tabs[0].key);
const selectedTabIndex = ref(props.initialActiveTab || 0);

const { xs, sm } = useGlobalBreakpoints();

const handleSelectTab = (tabKey: string) => {
	if (selectedTab.value === tabKey) return;
	selectedTab.value = tabKey;
	selectedTabIndex.value = props.tabs.findIndex(tab => tab.key === tabKey);
};

const getTabsToDisplay = computed(() => {
	if (xs.value || sm.value) return props.tabs.slice(0, 1);
	return props.tabs.slice(0, Math.min(props.tabs.length, props.tabsToDisplay));
});

const getOtherTabs = computed(() => {
	if (props.tabs.length > 1 && (sm.value || xs.value)) return props.tabs.slice(1);
	if (props.tabs.length > props.tabsToDisplay && !(sm.value || xs.value)) return props.tabs.slice(props.tabsToDisplay);
	return [];
});

</script>

<template>
  <div
    class="w-full "
    v-bind="$attrs"
  >
    <TabGroup
      :default-index="initialActiveTab"
    >
      <TabList class="flex items-center p-2 rounded-md bg-slate-200 gap-x-4">
        <Tab
          v-for="tab in getTabsToDisplay"
          :key="tab.key"
          as="template"
        >
          <HfButton
            no-style
            :class="[
              'flex-1 focus:outline-none border-2 rounded-md p-2 text-sm sm:text-xs xs:text-xs font-medium leading-5 inline-flex items-center justify-center gap-x-1 transition-all duration-200 ease-in-out truncate',
              {
                'bg-white shadow cursor-default': selectedTab === tab.key,
                'text-black hover:bg-slate-300 hover:shadow  hover:border-slate-300  border-slate-300': selectedTab !== tab.key,
                'text-blue-500 border-blue-500': selectedTab === tab.key && props.color === 'blue',
                'text-violet-500 border-violet-500': selectedTab === tab.key && props.color === 'violet',
                'text-yellow-500 border-yellow-500': selectedTab === tab.key && props.color === 'yellow',
              }
            ]"
            @click="handleSelectTab(tab.key)"
          >
            {{ tab.label }}
            <component
              :is="tab.icon"
              v-if="tab.icon"
              class="size-5 sm:size-4 xs:size-4 shrink-0"
            />
          </HfButton>
        </Tab>
        <Tab
          v-if="getOtherTabs.length > 0"
          as="template"
        >
          <HfDropdownMenu :menu-icon="Bars3Icon">
            <template #default="{closeMenu}">
              <div class="flex flex-col gap-y-4">
                <HfButton
                  v-for="subTab in getOtherTabs"
                  :key="subTab.key"
                  no-style
                  :class="[
                    'flex-1 focus:outline-none border-2 rounded-md p-2 text-sm sm:text-xs xs:text-xs font-medium leading-5 inline-flex items-center justify-center gap-x-1 transition-all duration-200 ease-in-out truncate',
                    {
                      'bg-white shadow': selectedTab === subTab.key,
                      'text-black hover:bg-slate-100 hover:shadow  hover:border-slate-100  border-slate-100': selectedTab !== subTab.key,
                      'text-blue-500 border-blue-500': selectedTab === subTab.key && props.color === 'blue',
                      'text-violet-500 border-violet-500': selectedTab === subTab.key && props.color === 'violet',
                      'text-yellow-500 border-yellow-500': selectedTab === subTab.key && props.color === 'yellow',
                    }
                  ]"
                  @click="() => { handleSelectTab(subTab.key); closeMenu(); }"
                >
                  {{ subTab.label }}
                  <component
                    :is="subTab.icon"
                    v-if="subTab.icon"
                    class="size-5 sm:size-4 xs:size-4 shrink-0"
                  />
                </HfButton>
              </div>
            </template>
          </HfDropdownMenu>
        </Tab>
        <slot name="other"></slot>
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
