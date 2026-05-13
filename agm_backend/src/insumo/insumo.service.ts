import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

@Injectable()
export class InsumoService {
  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async create(createDto: CreateInsumoDto) {
    const insumo = this.insumoRepository.create({
      descricao: createDto.descricao,
      lote: { idLote: createDto.loteId } as any,
    });
    return this.insumoRepository.save(insumo);
  }

  async findAll() {
    return this.insumoRepository.find({ relations: ['lote'] });
  }

  async findOne(id: number) {
    const insumo = await this.insumoRepository.findOne({
      where: { idInsumo: id },
      relations: ['lote'],
    });
    if (!insumo) throw new NotFoundException('Insumo não encontrado.');
    return insumo;
  }

  async update(id: number, updateDto: UpdateInsumoDto) {
    await this.insumoRepository.update(id, {
      descricao: updateDto.descricao,
      ...(updateDto.loteId && { lote: { idLote: updateDto.loteId } as any }),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const insumo = await this.findOne(id);
    await this.insumoRepository.delete(id);
    return insumo;
  }
}
