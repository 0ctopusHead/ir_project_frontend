<script setup lang="ts">
import router from '@/router'
import CreateBookmarkCard from '../components/CreateBookmarkCard.vue'
import FolderService from '@/services/FolderService'
import type { RecommendItem } from '@/type'
import { useAuthStore } from '@/stores/auth'
import type { Folder } from '@/type'
import type { AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import RecommendCard from '@/components/RecommendCard.vue'
const authStore = useAuthStore()
const folders: Ref<Array<Folder>> = ref([])
const recommends: Ref<Array<RecommendItem>> = ref([])
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
FolderService.getRecommend(authStore.user?.id as number)
  .then((response) => {
    const responseData = response.data
    recommends.value = responseData
    console.log(recommends.value)
  })
  .catch((err) => {
    console.log(err)
  })
</script>
<template>
  <div class="w-full bg-red-300 font-sans text-3xl">
    <h1>Folders</h1>
  </div>
  <div class="ml-20">
    <CreateBookmarkCard></CreateBookmarkCard>
  </div>
  <div class="w-full bg-red-300 font-sans text-3xl">
    <h1>Recommendations</h1>
  </div>
  <div class="ml-20 grid grid-cols-6 gap-2">
    <RecommendCard
      v-for="recommend in recommends"
      :key="recommend.RecipeId"
      :recommend="recommend"
    ></RecommendCard>
  </div>
</template>
