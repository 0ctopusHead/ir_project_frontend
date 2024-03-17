<script setup lang="ts">
import BookMarkCard from '@/components/BookMarkCard.vue'
import type { BookmarkFolder } from '@/type'
import FolderService from '@/services/FolderService'
import { useAuthStore } from '@/stores/auth'
import { ref, type Ref } from 'vue'
import { string } from 'yup'
import router from '@/router'
const bookmarks: Ref<Array<BookmarkFolder>> = ref([])
const authStore = useAuthStore()
const props = defineProps({
  id: string
})
FolderService.getBookmark(Number(props.id))
  .then((response) => {
    bookmarks.value = response.data
  })
  .catch((err) => {
    console.log(err)
  })
function onDelete() {
  FolderService.deleteFolder(Number(props.id))
    .then(() => {
      console.log('Success')
    })
    .catch((err) => {
      console.log(err)
    })
  router.push({ name: 'home' })
}
</script>
<template>
  <button class="button mb-10" @click="onDelete">Delete This Folder</button>
  <div class="flex flex-col items-center">
    <BookMarkCard
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
    ></BookMarkCard>
  </div>
</template>

<style scoped>
.button {
  margin-top: 20px;
  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
