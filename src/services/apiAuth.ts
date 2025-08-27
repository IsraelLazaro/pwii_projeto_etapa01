import { api } from "../../api";

export async function loginApi(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  return response.data; 
}

export async function registerApi(name: string, email: string, password: string) {
  const response = await api.post("/register", { name, email, password });
  return response.data;
}
