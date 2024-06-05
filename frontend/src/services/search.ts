import { type ApiSearchResponse, type Data } from "../types";
import { API_HOST } from "../config";

export const searchData = async (
  search: string
): Promise<[Error | null, Data?]> => {
  try {
    const res = await fetch(`${API_HOST}/api/cars?q=` + search);

    if (!res.ok) {
      return [new Error(`Error buscando datos: ${res.statusText}`)];
    }

    const json = (await res.json()) as ApiSearchResponse;
    return [null, json.data];
  } catch (error) {
    if (error instanceof Error) {
      return [error];
    } else {
      return [new Error("Error desconocido")];
    }
  }
};
