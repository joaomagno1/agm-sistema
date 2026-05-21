import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteCultivo } from './entities/lote-cultivo.entity';
import { Gerente } from '../gerente/entities/gerente.entity';
import { CreateLoteCultivoDto } from './dto/create-lote-cultivo.dto';
import { UpdateLoteCultivoDto } from './dto/update-lote-cultivo.dto';

@Injectable()
export class LoteCultivoService {
  constructor(
    @InjectRepository(LoteCultivo)
    private readonly loteRepository: Repository<LoteCultivo>,
  ) {}

  async create(createDto: CreateLoteCultivoDto) {
    const lote = this.loteRepository.create({
      periodo: createDto.periodo,
      nomeLote: createDto.nomeLote,
      gerente: { idGerente: createDto.idGerente } as unknown as Gerente,
    });
    return this.loteRepository.save(lote);
  }

  async findAll() {
    return this.loteRepository.find({ relations: ['gerente'] });
  }

  async findOne(id: number) {
    const lote = await this.loteRepository.findOne({
      where: { idLote: id },
      relations: ['gerente'],
    });
    if (!lote) throw new NotFoundException('Lote não encontrado.');
    return lote;
  }

  async update(id: number, updateDto: UpdateLoteCultivoDto) {
    await this.loteRepository.update(id, {
      periodo: updateDto.periodo,
      nomeLote: updateDto.nomeLote,
      ...(updateDto.idGerente && {
        gerente: { idGerente: updateDto.idGerente },
      }),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const lote = await this.findOne(id);
    await this.loteRepository.delete(id);
    return lote;
  }
}
