import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGerenteDto {
  @IsString()
  @IsNotEmpty({ message: 'O código do gerente é obrigatório.' })
  codGerente: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do gerente é obrigatório.' })
  nomeGerente: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  idUsuario: number;
}
