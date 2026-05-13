import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AplicacaoInsumo } from './entities/aplicacao-insumo.entity';
import { CreateAplicacaoInsumoDto } from './dto/create-aplicacao-insumo.dto';
import { UpdateAplicacaoInsumoDto } from './dto/update-aplicacao-insumo.dto';

@Injectable()
export class AplicacaoInsumoService {
  constructor(
    @InjectRepository(AplicacaoInsumo)
    private readonly aplicacaoRepository: Repository<AplicacaoInsumo>,
  ) {}

  async create(createDto: CreateAplicacaoInsumoDto) {
    const aplicacao = this.aplicacaoRepository.create({
      funcionario: { idFuncionario: createDto.funcionarioId } as any,
      insumo: { idInsumo: createDto.insumoId } as any,
      quantidade: createDto.quantidade,
    });
    return this.aplicacaoRepository.save(aplicacao);
  }

  async findAll() {
    return this.aplicacaoRepository.find({ relations: ['funcionario', 'insumo', 'insumo.lote'] });
  }

  async findOne(id: number) {
    const aplicacao = await this.aplicacaoRepository.findOne({
      where: { idAplicacao: id },
      relations: ['funcionario', 'insumo', 'insumo.lote'],
    });
    if (!aplicacao) throw new NotFoundException('Aplicação não encontrada.');
    return aplicacao;
  }

  async update(id: number, updateDto: UpdateAplicacaoInsumoDto) {
    await this.aplicacaoRepository.update(id, {
      ...(updateDto.funcionarioId && { funcionario: { idFuncionario: updateDto.funcionarioId } as any }),
      ...(updateDto.insumoId && { insumo: { idInsumo: updateDto.insumoId } as any }),
      ...(updateDto.quantidade !== undefined && { quantidade: updateDto.quantidade }),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const aplicacao = await this.findOne(id);
    await this.aplicacaoRepository.delete(id);
    return aplicacao;
  }
}
