<script setup lang="ts">
import type { Folder } from '@/type'
import type { PropType } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  options: {
    type: Object as PropType<Folder[]>,
    required: true
  }
})
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <select
    class="field"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    v-bind="$attrs"
  >
    <option
      v-for="option in options"
      :value="option?.id"
      :key="option?.id"
      :selected="option?.id === modelValue"
    >
      {{ option?.name }}
    </option>
  </select>
</template>
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
</style>
