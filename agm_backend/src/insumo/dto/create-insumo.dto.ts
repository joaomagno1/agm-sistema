import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @IsNotEmpty({ message: 'A descrição do insumo é obrigatória.' })
  descricao: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do lote é obrigatório.' })
  loteId: number;
}
