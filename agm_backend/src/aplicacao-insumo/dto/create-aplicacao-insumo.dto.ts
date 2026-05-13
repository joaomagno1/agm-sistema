import { IsNumber, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateAplicacaoInsumoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do funcionário é obrigatório.' })
  funcionarioId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do insumo é obrigatório.' })
  insumoId: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  quantidade?: number;
}
