<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Upload File</h2>
    <div class="flex items-center space-x-4">
      <label class="flex-1">
        <input type="file" @change="handleFileChange" class="hidden" />
        <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-200 transition duration-300">
          <span class="text-gray-600">{{ selectedFile ? selectedFile.name : 'Select a file' }}</span>
        </div>
      </label>
      <button @click="uploadFile" :disabled="!selectedFile || loading" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Upload
      </button>
    </div>
    <div v-if="loading" class="mt-4 text-center">
      <span class="text-gray-600">Uploading...</span>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'FileUpload',
  data() {
    return {
      selectedFile: null,
      loading: false
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
    },
    async uploadFile() {
      if (!this.selectedFile) return

      this.loading = true
      try {
        await api.uploadFile(this.selectedFile)
        alert('File uploaded successfully!')
        this.$emit('file-uploaded')
        this.selectedFile = null
      } catch (error) {
        console.error('Error uploading file:', error)
        alert('Error uploading file')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
