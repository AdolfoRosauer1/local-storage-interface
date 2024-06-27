<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Files and Directories</h2>
    <ul class="space-y-2">
      <li v-for="item in items" :key="item.name" class="flex items-center justify-between bg-gray-50 p-3 rounded">
        <span class="text-gray-700">{{ item.name }}</span>
        <div>
          <button @click="downloadItem(item)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
            <i class="fas fa-download"></i>
          </button>
          <button @click="deleteItem(item)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faTrash, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

library.add(faDownload, faTrash, faFolderOpen)

export default {
  name: 'FileList',
  components: {
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetchItems(path = '') {
      try {
        this.items = await api.listItems(path)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    downloadItem(item) {
      window.open(api.getDownloadUrl(item.id), '_blank')
    },
    openDirectory(item) {
      this.fetchItems(item.path)
    },
    async deleteItem(item) {
      try {
        await api.deleteFile(item.id)
        this.fetchItems()  // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  },
  mounted() {
    this.fetchItems()
  }
}
</script>

<style>
@import "~@fortawesome/fontawesome-svg-core/styles.css";
</style>
