<!-- BookMarkCard.vue -->
<template>
  <div class="bookmark-card" v-if="bookmark">
    <img :src="bookmark.image" />
    <span>Name: {{ bookmark.name }}</span>
    <br />
    <span>Score: {{ bookmark.user_review }}</span>
    <br />
    <slot name="deleteButton"></slot>
  </div>
</template>

<script setup lang="ts">
import type { BookmarkFolder } from '@/type'
import { defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  bookmark: Object as PropType<BookmarkFolder>
})
</script>

<style scoped>
.bookmark-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
</style>
