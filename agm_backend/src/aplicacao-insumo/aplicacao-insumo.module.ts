import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacaoInsumo } from './entities/aplicacao-insumo.entity';
import { AplicacaoInsumoService } from './aplicacao-insumo.service';
import { AplicacaoInsumoController } from './aplicacao-insumo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AplicacaoInsumo])],
  controllers: [AplicacaoInsumoController],
  providers: [AplicacaoInsumoService],
  exports: [AplicacaoInsumoService],
})
export class AplicacaoInsumoModule {}
