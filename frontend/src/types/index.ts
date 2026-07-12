export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  category: string;
  manufacturingYear: number;
  price: number;
  fuelType: string;
  transmissionType: string;
  color: string;
  description: string;
  imageUrl?: string;
  availableStock: number;
}
