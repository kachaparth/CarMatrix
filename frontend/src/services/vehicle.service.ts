import api from '../api/axios';
import { Vehicle } from '../types';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  search: async (params: { make?: string; model?: string; category?: string; minPrice?: number; maxPrice?: number }): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles/search', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Vehicle> => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  create: async (data: any): Promise<Vehicle> => {
    const response = await api.post('/vehicles', data);
    return response.data;
  },

  update: async (id: number, data: any): Promise<Vehicle> => {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  }
};

export const inventoryService = {
  purchase: async (id: number, quantity: number): Promise<any> => {
    const response = await api.post(`/vehicles/${id}/purchase`, { quantity });
    return response.data;
  },

  restock: async (id: number, quantity: number): Promise<any> => {
    const response = await api.post(`/vehicles/${id}/restock`, { quantity });
    return response.data;
  }
};
