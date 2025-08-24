import { api } from "../../api";

export type Sex = "Male" | "Female";

export interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  specie: string;
  sex: Sex;
  photos?: string[];          // ← opcional
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

    // res.data já vem com os nomes de arquivo (ex.: ["abc.png"])
    // No componente, continue usando:
    // `${api.getUri()}/uploads/${pet.photos[0]}`

    return res.data ?? [];
  } catch (err) {
    console.error("Erro ao buscar pets da cidade:", err);
    return [];
  }
}
