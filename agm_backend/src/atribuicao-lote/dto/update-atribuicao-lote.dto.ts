import { PartialType } from '@nestjs/mapped-types';
import { CreateAtribuicaoLoteDto } from './create-atribuicao-lote.dto';

export class UpdateAtribuicaoLoteDto extends PartialType(CreateAtribuicaoLoteDto) {}
