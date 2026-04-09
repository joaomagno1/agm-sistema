import { IsString, IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do funcionário não pode estar vazio!' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O cargo é obrigatório!' })
  cargo: string;

  @IsNumber()
  @Min(0, { message: 'O salário não pode ser negativo, meu Senhor!' })
  salario: number;

  @IsNumber()
  @IsPositive({ message: 'O ID do setor deve ser um número válido!' })
  setor_id: number;
}