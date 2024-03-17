<script setup lang="ts">
import type { Folder } from '@/type'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'
import FolderService from '@/services/FolderService'
const props = defineProps({
  folder: {
    type: Object as PropType<Folder>
  }
})
</script>
<template>
  <div class="folder-card" v-if="folder">
    <RouterLink :to="{ name: 'bookmark', params: { id: folder?.id } }">
      <div>
        <div>
          <font-awesome-icon icon="folder" />
        </div>
        <span>Name: {{ folder.name }}</span>
      </div>
    </RouterLink>
  </div>
</template>
<style scoped>
/* Folder Card */
.folder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.folder-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.folder-name {
  font-size: 1rem;
}
</style>
