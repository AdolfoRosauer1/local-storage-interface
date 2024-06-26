<template>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Files and Directories</h2>
      <ul class="space-y-2">
        <li v-for="item in items" :key="item.name" class="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span class="text-gray-700">{{ item.name }}</span>
          <div>
            <button @click="downloadItem(item)" v-if="!item.isDirectory" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
              Download
            </button>
            <button @click="openDirectory(item)" v-if="item.isDirectory" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
              Open
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '@/services/api'
  
  export default {
    name: 'FileList',
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
        window.open(api.getDownloadUrl(item.path), '_blank')
      },
      openDirectory(item) {
        this.fetchItems(item.path)
      }
    },
    mounted() {
      this.fetchItems()
    }
  }
  </script>