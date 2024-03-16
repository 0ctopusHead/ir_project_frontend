<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FolderService from '@/services/FolderService'
const authStore = useAuthStore()
const showPopup = ref(false)
const userInput = ref('')

const closePopup = () => {
  showPopup.value = false
}

const submitInput = () => {
  console.log('User input:', userInput.value)
  FolderService.createFolder(authStore.user?.id as number, userInput.value)
  userInput.value = ''
  closePopup()
}

const cancelInput = () => {
  userInput.value = ''
  closePopup()
}
</script>

<template>
  <div class="add-card border border-black w-48 h-56 ml-5 bg-gray-800" @click="showPopup = true">
    <div class="mt-20 text-white text-5xl"><font-awesome-icon icon="plus" /></div>
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
</template>

<style>
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
</style>
