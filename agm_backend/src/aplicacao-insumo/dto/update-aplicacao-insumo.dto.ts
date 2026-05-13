import { PartialType } from '@nestjs/mapped-types';
import { CreateAplicacaoInsumoDto } from './create-aplicacao-insumo.dto';

export class UpdateAplicacaoInsumoDto extends PartialType(CreateAplicacaoInsumoDto) {}
