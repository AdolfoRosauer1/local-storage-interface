<template>
    <div class="home">
      <h1>File Server</h1>
      <FileUpload @file-uploaded="refreshFileList" />
      <FileList ref="fileList" />
    </div>
  </template>
  
  <script>
  import FileList from '@/components/FileList.vue'
  import FileUpload from '@/components/FileUpload.vue'
  
  export default {
    name: 'HomeView',
    components: {
      FileList,
      FileUpload
    },
    methods: {
      refreshFileList() {
        this.$refs.fileList.fetchItems()
      }
    }
  }
  </script>