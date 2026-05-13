import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtribuicaoLote } from './entities/atribuicao-lote.entity';
import { AtribuicaoLoteService } from './atribuicao-lote.service';
import { AtribuicaoLoteController } from './atribuicao-lote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AtribuicaoLote])],
  controllers: [AtribuicaoLoteController],
  providers: [AtribuicaoLoteService],
  exports: [AtribuicaoLoteService],
})
export class AtribuicaoLoteModule {}
