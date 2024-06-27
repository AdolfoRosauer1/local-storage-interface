import axios from 'axios';

const API_URL = 'http://localhost:8888/api';

export default {
  async listItems() {
    try {
      const response = await axios.get(`${API_URL}/files`, );
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteFile(id) {
    try {
      const response = await axios.delete(`${API_URL}/files/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  getDownloadUrl(id) {
    return `${API_URL}/files/${id}`;
  }
};