import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtribuicaoLote } from './entities/atribuicao-lote.entity';
import { CreateAtribuicaoLoteDto } from './dto/create-atribuicao-lote.dto';
import { UpdateAtribuicaoLoteDto } from './dto/update-atribuicao-lote.dto';

@Injectable()
export class AtribuicaoLoteService {
  constructor(
    @InjectRepository(AtribuicaoLote)
    private readonly atribuicaoRepository: Repository<AtribuicaoLote>,
  ) {}

  async create(createDto: CreateAtribuicaoLoteDto) {
    const atribuicao = this.atribuicaoRepository.create({
      lote: { idLote: createDto.loteId } as any,
      funcionario: { idFuncionario: createDto.funcionarioId } as any,
    });
    return this.atribuicaoRepository.save(atribuicao);
  }

  async findAll() {
    return this.atribuicaoRepository.find({ relations: ['lote', 'funcionario'] });
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
      ...(updateDto.loteId && { lote: { idLote: updateDto.loteId } as any }),
      ...(updateDto.funcionarioId && { funcionario: { idFuncionario: updateDto.funcionarioId } as any }),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const atribuicao = await this.findOne(id);
    await this.atribuicaoRepository.delete(id);
    return atribuicao;
  }
}
