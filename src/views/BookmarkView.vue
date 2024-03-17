<script setup lang="ts">
import BookMarkCard from '@/components/BookMarkCard.vue'
import type { BookmarkFolder } from '@/type'
import FolderService from '@/services/FolderService'
import { useAuthStore } from '@/stores/auth'
import { ref, type Ref } from 'vue'
import { string } from 'yup'
import router from '@/router'
import { onBeforeRouteUpdate } from 'vue-router'
const bookmarks: Ref<Array<BookmarkFolder>> = ref([])
const authStore = useAuthStore()
const props = defineProps({
  id: string
})

// Function to fetch bookmarks
const fetchBookmarks = () => {
  FolderService.getBookmark(Number(props.id))
    .then((response) => {
      bookmarks.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

// Initial fetch of bookmarks
fetchBookmarks()

// Function to delete folder
function onDelete() {
  FolderService.deleteFolder(Number(props.id))
    .then(() => {
      console.log('Success')
      // After successful deletion, fetch bookmarks again to update the list
      fetchBookmarks()
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
}

// Function to delete bookmark
function onDeleteBookmark(bookmarkId: number) {
  FolderService.deleteBookmark(bookmarkId)
    .then(() => {
      console.log('Bookmark deleted successfully')
      // After successful deletion, fetch bookmarks again to update the list
      fetchBookmarks()
      router.push({ name: 'bookmark', params: { id: Number(props.id) } })
    })
    .catch((err) => {
      console.error('Failed to delete bookmark:', err)
    })
}

// Hook to fetch bookmarks before route update
onBeforeRouteUpdate((to, from, next) => {
  fetchBookmarks()
  next()
})
</script>
<template>
  <button class="button mb-10" @click="onDelete">Delete This Folder</button>
  <div class="flex flex-col items-center">
    <BookMarkCard v-for="bookmark in bookmarks" :key="bookmark.id" :bookmark="bookmark">
      <template #deleteButton>
        <button @click="onDeleteBookmark(bookmark.id)" class="text-red-500 hover:text-red-800">
          Delete From Bookmark
        </button>
      </template>
    </BookMarkCard>
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
