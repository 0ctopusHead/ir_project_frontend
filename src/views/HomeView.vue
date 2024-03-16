<script setup lang="ts">
import CreateBookmarkCard from '../components/CreateBookmarkCard.vue'
import FolderCard from '../components/FolderCard.vue'
import FolderService from '@/services/FolderService'
import { useAuthStore } from '@/stores/auth'
import type { Folder } from '@/type'
import type { AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'
const authStore = useAuthStore()
const folders: Ref<Array<Folder>> = ref([])
FolderService.getFolder(authStore.user?.id as number)
  .then((response: AxiosResponse<Folder[]>) => {
    folders.value = response.data
  })
  .catch((err) => {
    console.log(err)
  })
</script>
<template>
  <CreateBookmarkCard></CreateBookmarkCard>
  <FolderCard v-for="folder in folders" :key="folder.id" :folder="folder"></FolderCard>
</template>
