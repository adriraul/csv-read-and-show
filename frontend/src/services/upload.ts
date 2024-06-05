import { ApiUploadResponse, type Data } from "../types";
import { API_HOST } from "../config";

export const uploadFile = async (
  file: File
): Promise<[Error | null, Data?]> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch(`${API_HOST}/api/files`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return [new Error(`Error al subir el archivo: ${res.statusText}`)];
    }

    const json = (await res.json()) as ApiUploadResponse;
    return [null, json.data];
  } catch (error) {
    if (error instanceof Error) {
      return [error];
    } else {
      return [new Error("Error desconocido")];
    }
  }
};
