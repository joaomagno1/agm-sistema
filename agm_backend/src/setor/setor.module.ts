import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';
import { Setor } from './entities/setor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setor])], // Conecta a entidade ao TypeORM
  controllers: [SetorController],
  providers: [SetorService],
})
export class SetorModule {}