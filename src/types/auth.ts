export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
}
