import axios from "axios";
import type { ApiResponse, Product } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export type ProductQuery = {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const fetchProducts = async (query: ProductQuery) => {
  const response = await api.get<ApiResponse<Product[]>>("/products", { params: query });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get<ApiResponse<string[]>>("/products/categories");
  return response.data.data;
};

export const fetchProductById = async (id: string) => {
  const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data.data;
};

export const registerUser = async (payload: { email: string; password: string; name: string }) => {
  const response = await api.post<ApiResponse<{ token: string; user: { id: number; email: string; name: string; role: string } }>>(
    "/auth/register",
    payload,
  );
  return response.data.data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const response = await api.post<ApiResponse<{ token: string; user: { id: number; email: string; name: string; role: string } }>>(
    "/auth/login",
    payload,
  );
  return response.data.data;
};

export default api;
