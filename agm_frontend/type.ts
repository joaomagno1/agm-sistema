export interface Usuario {
  idUsuario: number;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  tipo: number;
}

export interface CreateUsuarioData {
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  tipo?: number;
}
