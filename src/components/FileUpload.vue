<template>
    <div class="file-upload">
      <h2>Upload File</h2>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'FileUpload',
    data() {
      return {
        selectedFile: null
      }
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0]
      },
      async uploadFile() {
        if (!this.selectedFile) return
  
        const formData = new FormData()
        formData.append('file', this.selectedFile)
  
        try {
          await axios.post('http://localhost:8080/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          alert('File uploaded successfully!')
          this.$emit('file-uploaded')
        } catch (error) {
          console.error('Error uploading file:', error)
          alert('Error uploading file')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .file-upload {
    margin-top: 20px;
  }
  input[type="file"] {
    margin-right: 10px;
  }
  </style>