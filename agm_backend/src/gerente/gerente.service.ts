import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from './entities/gerente.entity';
import { CreateGerenteDto } from './dto/create-gerente.dto';
import { UpdateGerenteDto } from './dto/update-gerente.dto';

@Injectable()
export class GerenteService {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async create(createGerenteDto: CreateGerenteDto) {
    const gerente = this.gerenteRepository.create({
      codGerente: createGerenteDto.codGerente,
      nomeGerente: createGerenteDto.nomeGerente,
      usuario: { idUsuario: createGerenteDto.idUsuario } as any,
    });
    return this.gerenteRepository.save(gerente);
  }

  async findAll() {
    return this.gerenteRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number) {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente: id },
      relations: ['usuario'],
    });
    if (!gerente) throw new NotFoundException('Gerente não encontrado.');
    return gerente;
  }

  async update(id: number, updateGerenteDto: UpdateGerenteDto) {
    const gerente = await this.findOne(id);
    if (updateGerenteDto.codGerente) gerente.codGerente = updateGerenteDto.codGerente;
    if (updateGerenteDto.nomeGerente) gerente.nomeGerente = updateGerenteDto.nomeGerente;
    if (updateGerenteDto.idUsuario) gerente.usuario = { idUsuario: updateGerenteDto.idUsuario } as any;
    return this.gerenteRepository.save(gerente);
  }

  async remove(id: number) {
    const gerente = await this.findOne(id);
    await this.gerenteRepository.delete(id);
    return gerente;
  }
}
