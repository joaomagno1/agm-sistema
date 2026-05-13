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

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.setorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
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
