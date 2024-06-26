<template>
    <div class="file-list">
      <h2>Files and Directories</h2>
      <ul>
        <li v-for="item in items" :key="item.name">
          {{ item.name }}
          <button @click="downloadItem(item)" v-if="!item.isDirectory">Download</button>
          <button @click="openDirectory(item)" v-if="item.isDirectory">Open</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
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
          const response = await axios.get(`http://localhost:8080/list?path=${path}`)
          this.items = response.data
        } catch (error) {
          console.error('Error fetching items:', error)
        }
      },
      downloadItem(item) {
        window.open(`http://localhost:8080/download?file=${item.path}`, '_blank')
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
  
  <style scoped>
  .file-list {
    margin-top: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  button {
    margin-left: 10px;
  }
  </style>