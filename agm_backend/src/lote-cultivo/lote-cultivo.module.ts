import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteCultivo } from './entities/lote-cultivo.entity';
import { LoteCultivoService } from './lote-cultivo.service';
import { LoteCultivoController } from './lote-cultivo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoteCultivo])],
  controllers: [LoteCultivoController],
  providers: [LoteCultivoService],
  exports: [LoteCultivoService],
})
export class LoteCultivoModule {}
