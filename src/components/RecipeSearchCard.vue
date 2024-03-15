<template>
  <RouterLink :to="{ name: 'recipe-detail', params: { id: recipe.RecipeId } }">
    <div class="recipe-class">
      <div class="recipe-card">
        <span>
          <img :src="recipe.Images" />
        </span>
        <span>Name: {{ recipe.Name }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { QueryResults } from '@/type'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  recipe: {
    type: Object as PropType<QueryResults>,
    required: true
  }
})
</script>

<style scoped>
.recipe-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.recipe-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
