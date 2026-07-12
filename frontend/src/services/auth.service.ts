import api from '../api/axios';
import { AuthResponse } from '../types';

export const authService = {
  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  register: async (data: any): Promise<any> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  }
};
