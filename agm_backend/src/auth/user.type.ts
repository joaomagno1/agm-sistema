import { Setor } from '../setor/entities/setor.entity';

export interface AuthenticatedUser {
  idUsuario: number;
  email: string;
  nomeUsuario: string;
  tipo: number;
  codUsuario: string;
  setor: Setor;
}
