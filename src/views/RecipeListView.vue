<template>
  <main class="flex flex-col items-center top-0">
    <div class="flex">
      <input type="text" v-model="query" class="block w-96 p-2 text-base border border-black" />
      <button @click="updateKeyword" class="ml-5 hover:text-green-500">Search</button>
    </div>
    <span
      v-if="
        showSpellCorrection && query !== spell_correction && spell_correction != '' && searchClicked
      "
    >
      Did you mean <button @click="handleSuggestionClick">{{ spell_correction }}</button>
    </span>
  </main>
  <div class="inline-block mt-6">
    <RecipeSearchCard
      v-for="recipe in recipes"
      :key="recipe.RecipeId"
      :recipe="recipe"
    ></RecipeSearchCard>
  </div>
</template>

<script setup lang="ts">
import QueryService from '../services/QueryService'
import type { QueryResults } from '@/type'
import RecipeSearchCard from '../components/RecipeSearchCard.vue'
import { ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRecipeStore } from '@/stores/recipe'

const query = ref('')
const spell_correction = ref('')
const showSpellCorrection = ref(false)
const store = useRecipeStore()
const recipes: Ref<Array<QueryResults>> = ref([])
const searchClicked = ref(false)

function updateKeyword() {
  let queryFunction
  if (query.value !== '') {
    queryFunction = QueryService.getQuery(query.value)
    searchClicked.value = true // Set searchClicked to true when the search button is clicked
  }
  queryFunction
    ?.then((response: AxiosResponse<any>) => {
      const responseData = response.data
      spell_correction.value = responseData.corrected_query || ''
      showSpellCorrection.value = spell_correction.value !== '' && searchClicked.value // Only show if there's a suggestion and search button clicked
      if (responseData && responseData.results) {
        recipes.value = responseData.results
        store.setRecipes(recipes.value)
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

function handleSuggestionClick() {
  query.value = spell_correction.value
  updateKeyword()
  searchClicked.value = false
}
</script>
