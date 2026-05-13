import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLoteCultivoDto {
  @IsNumber()
  @IsOptional()
  periodo?: number;

  @IsString()
  @IsNotEmpty({ message: 'O nome do lote é obrigatório.' })
  nomeLote: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do gerente é obrigatório.' })
  idGerente: number;
}
