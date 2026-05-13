import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from './entities/gerente.entity';
import { GerenteService } from './gerente.service';
import { GerenteController } from './gerente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gerente])],
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}
