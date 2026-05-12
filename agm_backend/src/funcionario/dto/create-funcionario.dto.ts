import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O código do funcionário é obrigatório!' })
  codFuncionario: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do funcionário é obrigatório!' })
  nomeFuncionario: string;

  @IsNumber()
  @IsOptional()
  idade?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório!' })
  id_usuario: number;
}
