<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FolderService from '@/services/FolderService'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Folder } from '@/type'
import type { AxiosResponse } from 'axios'
import router from '@/router'
import FolderCard from './FolderCard.vue'

const authStore = useAuthStore()
const folders = ref<Array<Folder>>([])
const showPopup = ref(false)
const userInput = ref('')

const closePopup = () => {
  showPopup.value = false
}

const submitInput = () => {
  console.log('User input:', userInput.value)
  FolderService.createFolder(authStore.user?.id as number, userInput.value)
    .then(() => {
      // Fetch folders again after successfully creating a new folder
      fetchFolders()
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.error('Error creating folder:', err)
    })
  userInput.value = ''
  closePopup()
}

const cancelInput = () => {
  userInput.value = ''
  closePopup()
}

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
  fetchFolders()
  next()
})
</script>

<template>
  <div @click="showPopup = true">
    <div class="create-bookmark-card"><font-awesome-icon icon="plus" /></div>
  </div>
  <div v-if="showPopup" class="popup-container">
    <div class="overlay" @click="cancelInput"></div>
    <div class="popup">
      <input v-model="userInput" type="text" placeholder="Folder Name" />
      <div class="button-container">
        <button @click="submitInput">Submit</button>
        <button @click="cancelInput" class="cancel-button">Cancel</button>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-6 gap-2">
    <FolderCard v-for="folder in folders" :key="folder.id" :folder="folder"></FolderCard>
  </div>
</template>

<style scoped>
.add-card {
  cursor: pointer;
  margin-bottom: 18px;
}
.add-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure the overlay is above other content */
}
.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensure the popup is above the overlay */
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

.cancel-button {
  background-color: red;
  color: white;
}

.cancel-button:hover {
  background-color: darkred;
}

/* Create Bookmark Card */
.create-bookmark-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-bookmark-card:hover {
  transform: translateY(-5px);
  border-color: #888;
}

.plus-icon {
  font-size: 3rem;
  color: #888;
}

.card-label {
  font-size: 1rem;
  color: #888;
  margin-top: 5px;
}
</style>
