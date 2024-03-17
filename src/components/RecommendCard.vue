<script setup lang="ts">
import FolderService from '@/services/FolderService'
import type { RecommendItem } from '@/type'
import type { PropType } from 'vue'

const props = defineProps({
  recommend: {
    type: Object as PropType<RecommendItem>
  }
})
</script>
<template>
  <div class="recommend-card mt-2 ml-2" v-if="recommend && recommend.RecipeId !== (NaN as number)">
    <img :src="recommend.Images" />
    <span>Name: {{ recommend.Name }}</span>
    <br />
    <br />
    <slot name="deleteButton"></slot>
  </div>
</template>
<style scoped>
.recommend-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
</style>
