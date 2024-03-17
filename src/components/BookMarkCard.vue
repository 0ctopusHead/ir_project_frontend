<script setup lang="ts">
import type { Bookmark, BookmarkFolder } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  bookmark: Object as PropType<BookmarkFolder>
})
</script>
<template>
  <div class="bookmark-card" v-if="bookmark">
    <img :src="bookmark.image" />
    <span>Name: {{ bookmark.name }}</span>
    <br />
    <span>Score: {{ bookmark.user_review }}</span>
  </div>
</template>
<style scoped>
.bookmark-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
</style>
