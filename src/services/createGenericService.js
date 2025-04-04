// src/services/genericService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const createGenericService = (baseEndpoint) => ({
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${baseEndpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching items from ${baseEndpoint}:`, error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with id ${id} from ${baseEndpoint}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${baseEndpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating item in ${baseEndpoint}:`, error);
      throw error;
    }
  },

  update: async (data) => {
    try {
      // Envía la solicitud a /api/Empleado sin incluir el ID en la URL
      const response = await axios.put(`${API_BASE_URL}${baseEndpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating item in ${baseEndpoint}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item with id ${id} from ${baseEndpoint}:`, error);
      throw error;
    }
  }
});
