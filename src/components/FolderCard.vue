<script setup lang="ts">
import type { Folder } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  folder: {
    type: Object as PropType<Folder>
  }
})
</script>
<template>
  <div v-if="folder">
    <div class="add-card border border-black w-48 h-56 ml-5 bg-white">
      <div class="mt-20 text-5xl">
        <font-awesome-icon icon="folder" />
      </div>
      <span>Name: {{ folder.name }}</span>
    </div>
  </div>
</template>
