<template>
  <div class="flex flex-col items-center">
    <div v-if="recipe">
      <div class="flex flex-col items-center">
        <img class="max-w-sm max-h-sm" :src="recipe.Images" />
      </div>
      <div>
        <p><b>Dish Name: </b>{{ recipe.Name }}</p>
        <br />
        <p><b>Description: </b>{{ recipe.Description }}</p>
        <br />
        <p><b>Recipe: </b>{{ recipe.RecipeIngredientParts }}</p>
        <br />
        <p><b>Instruction: </b>{{ recipe.RecipeInstructions }}</p>
      </div>
    </div>
    <form @submit.prevent="saveBookmark">
      <div>
        <BaseSelect
          label="Select Folder"
          :options="folders"
          v-model="bookmark.folder_id"
        ></BaseSelect>
      </div>
      <div>
        <label>Select Rating</label>
        <select v-model="bookmark.user_review" class="field">
          <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
      <button class="button" type="submit">Add To Bookmark</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseSelect from '../components/BaseSelect.vue'
import { useRecipeStore } from '@/stores/recipe'
import { useAuthStore } from '@/stores/auth'
import type { Bookmark } from '@/type'
import type { Folder } from '@/type'
import { ref } from 'vue'
import FolderService from '@/services/FolderService'
import router from '@/router'
const authStore = useAuthStore()
const folders = ref<Folder[]>([])
const recipeStore = useRecipeStore()
const recipe = recipeStore.recipe
console.log(recipe)
const bookmark = ref<Bookmark>({
  id: 0,
  folder_id: 0,
  recipe: {
    author_id: recipe?.AuthorId as number,
    author_name: recipe?.AuthorName as string,
    image: recipe?.Images as string,
    name: recipe?.Name as string,
    recipe_category: recipe?.RecipeCategory as string,
    recipe_id: recipe?.RecipeId as number,
    recipe_ingredient: recipe?.RecipeIngredientParts as string,
    recipe_instruction: recipe?.RecipeInstructions as string,
    review_count: recipe?.ReviewCount as number
  },
  user_review: 0,
  user_id: authStore.user?.id as number
})
FolderService.getFolder(authStore.user?.id as number).then((response) => {
  folders.value = response.data
})

function saveBookmark() {
  FolderService.addBookmark(bookmark.value)
    .then((response) => {
      console.log(response.data)
      router.push({ name: 'bookmark', params: { id: bookmark.value.folder_id as number } })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<style scoped>
.container {
  margin: 20px;
}

.recipe-details {
  display: flex;
  margin-bottom: 20px;
}

.image-container {
  width: 300px;
}

.recipe-image {
  max-width: 100%;
  max-height: 100%;
}

.details {
  margin-left: 20px;
}

.bookmark-form {
  margin-top: 20px;
}

.folder-select {
  width: 100%;
  margin-bottom: 10px;
}

.rating-select {
  width: 100%;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  margin-top: 20px;
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
