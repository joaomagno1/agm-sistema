import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtribuicaoLote } from './entities/atribuicao-lote.entity';
import { CreateAtribuicaoLoteDto } from './dto/create-atribuicao-lote.dto';
import { UpdateAtribuicaoLoteDto } from './dto/update-atribuicao-lote.dto';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { LoteCultivo } from '../lote-cultivo/entities/lote-cultivo.entity';

@Injectable()
export class AtribuicaoLoteService {
  constructor(
    @InjectRepository(AtribuicaoLote)
    private readonly atribuicaoRepository: Repository<AtribuicaoLote>,
  ) {}

  async create(createDto: CreateAtribuicaoLoteDto) {
    const atribuicao = this.atribuicaoRepository.create({
      lote: { idLote: createDto.loteId } as unknown as LoteCultivo,
      funcionario: { id: createDto.funcionarioId } as unknown as Funcionario,
    });
    return this.atribuicaoRepository.save(atribuicao);
  }

  async findAll() {
    return this.atribuicaoRepository.find({
      relations: ['lote', 'funcionario'],
    });
  }

  async findOne(id: number) {
    const atribuicao = await this.atribuicaoRepository.findOne({
      where: { idAtribuicao: id },
      relations: ['lote', 'funcionario'],
    });
    if (!atribuicao) throw new NotFoundException('Atribuição não encontrada.');
    return atribuicao;
  }

  async update(id: number, updateDto: UpdateAtribuicaoLoteDto) {
    await this.atribuicaoRepository.update(id, {
      ...(updateDto.loteId && { lote: { idLote: updateDto.loteId } }),
      ...(updateDto.funcionarioId && {
        funcionario: { id: updateDto.funcionarioId },
      }),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const atribuicao = await this.findOne(id);
    await this.atribuicaoRepository.delete(id);
    return atribuicao;
  }
}
