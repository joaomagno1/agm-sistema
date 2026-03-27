import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { Setor } from './entities/setor.entity';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(Setor)
    private setorRepository: Repository<Setor>,
  ) {}

  create(createSetorDto: CreateSetorDto) {
    const novoSetor = this.setorRepository.create(createSetorDto);
    return this.setorRepository.save(novoSetor);
  }

  findAll() {
    return this.setorRepository.find();
  }

  findOne(id: number) {
    return this.setorRepository.findOneBy({ id });
  }

  async update(id: number, updateSetorDto: UpdateSetorDto) {
    await this.setorRepository.update(id, updateSetorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.setorRepository.delete(id);
    return { message: `Setor #${id} removido com sucesso` };
  }
}