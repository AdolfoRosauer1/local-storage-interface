<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Go Files!</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FileUpload @file-uploaded="refreshFileList" />
      <FileList ref="fileList" />
    </div>
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