import { IsString, IsEmail, IsNotEmpty, Matches, IsOptional, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O código do usuário é obrigatório.' })
  codUsuario: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório.' })
  nomeUsuario: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'A senha deve ter 8+ caracteres, com maiúsculas, minúsculas e números.',
  })
  senha: string;

  @IsNumber()
  @IsOptional()
  tipo?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O setor é obrigatório.' })
  id_setor: number;
}
