import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAtribuicaoLoteDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do lote é obrigatório.' })
  loteId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do funcionário é obrigatório.' })
  funcionarioId: number;
}
