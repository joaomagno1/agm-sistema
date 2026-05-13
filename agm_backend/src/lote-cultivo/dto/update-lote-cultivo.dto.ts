import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteCultivoDto } from './create-lote-cultivo.dto';

export class UpdateLoteCultivoDto extends PartialType(CreateLoteCultivoDto) {}
