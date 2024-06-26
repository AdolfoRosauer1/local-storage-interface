import axios from 'axios';

const API_URL = 'http://localhost:8080';

export default {
  async listItems(path = '') {
    try {
      const response = await axios.get(`${API_URL}/list`, { params: { path } });
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
      const response = await axios.post(`${API_URL}/upload`, formData, {
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

  getDownloadUrl(filePath) {
    return `${API_URL}/download?file=${encodeURIComponent(filePath)}`;
  }
};