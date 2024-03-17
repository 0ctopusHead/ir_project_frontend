<script setup lang="ts">
import router from '@/router'
import CreateBookmarkCard from '../components/CreateBookmarkCard.vue'
import FolderCard from '../components/FolderCard.vue'
import FolderService from '@/services/FolderService'
import { useAuthStore } from '@/stores/auth'
import type { Folder } from '@/type'
import type { AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
const authStore = useAuthStore()
const folders: Ref<Array<Folder>> = ref([])
FolderService.getFolder(authStore.user?.id as number)
  .then((response: AxiosResponse<Folder[]>) => {
    folders.value = response.data
    router.push({ name: 'home' })
  })
  .catch((err) => {
    console.log(err)
  })
const fetchFolders = () => {
  FolderService.getFolder(authStore.user?.id as number)
    .then((response: AxiosResponse<Folder[]>) => {
      folders.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchFolders()

onBeforeRouteUpdate((to, from, next) => {
  fetchFolders() // Fetch folders before each route update
  next()
})
</script>
<template>
  <div class="ml-20">
    <CreateBookmarkCard></CreateBookmarkCard>
  </div>
</template>
