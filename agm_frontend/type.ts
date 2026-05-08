// src/types/usuario.ts (ou onde o senhor guarda as suas interfaces)
export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface CreateUsuarioData {
  nome: string;
  email: string;
  senha?: string; // Opcional no frontend após o cadastro, pois não a recebemos de volta
}