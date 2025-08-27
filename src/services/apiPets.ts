import { api } from "../../api";

export type Sex = "Male" | "Female";

export interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  specie: string;
  sex: Sex;
  photos?: string[];         
  description?: string;
  vaccines?: string[];
  weight?: number;
}

export async function getCityPets(): Promise<Pet[]> {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post<Pet[]>("/pets/city-pets", null, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data ?? [];
  } catch (err) {
    console.error("Erro ao buscar pets da cidade:", err);
    return [];
  }
}
