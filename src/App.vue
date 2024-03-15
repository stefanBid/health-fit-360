<script setup lang="ts">
import { HfDialog, HfButton } from '@/components'
import { ref } from 'vue'

const isOpen = ref(false)

</script>

<template>
  <HfButton @click="isOpen = !isOpen">
    {{ isOpen ? 'Close Dialog' : 'Open Dialog' }}
  </HfButton>
  <div class="flex flex-col p-10 gap-y-8 ">
    <HfDialog
      :is-open="isOpen"
      size="full"
      title="Dialog Title"
      subtitle="Nulla ex eiusmod consectetur nisi labore est elit ipsum. Laborum ullamco fugiat do officia veniam non. Nulla consequat elit quis magna nostrud minim sit cupidatat consectetur Lorem adipisicing eiusmod eu incididunt. Dolore tempor irure ea deserunt in sint culpa nulla mollit culpa mollit."
      :on-close="newVal => {isOpen = newVal;}"
    >
      <template #body-content>
        <div class="flex flex-wrap items-center justify-center w-full h-48 gap-4 overflow-y-scroll border border-red-500">
          <p
            v-for="i in 40"
            :key="i"
          >
            body {{ i }}
          </p>
        </div>
      </template>
      <template #footer-content>
        <div class="flex justify-end gap-x-4">
          <HfButton
            class="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-[10rem] truncate"
            @click="isOpen = false"
          >
            Close
          </HfButton>

          <HfButton
            class="w-[10rem] truncate"
            @click="isOpen = false"
          >
            Save
          </HfButton>
        </div>
      </template>
    </HfDialog>
  </div>
</template>
