import axios from 'axios';
const API_BASE_URL = 'http://localhost:3002/podcasts';

const podcastService = {
  getAllPodcasts: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },
  getPodcastById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },
  addPodcast: async (data) => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  },
  updatePodcast: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },
  deletePodcast: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};

export default podcastService;
