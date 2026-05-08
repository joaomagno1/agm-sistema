import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  create(createFuncionarioDto: CreateFuncionarioDto) {
    const novoFuncionario = this.funcionarioRepository.create(createFuncionarioDto);
    return this.funcionarioRepository.save(novoFuncionario);
  }

  findAll() {
    return this.funcionarioRepository.find({ relations: ['setor'] });
  }

  findOne(id: number) {
    return this.funcionarioRepository.findOne({ where: { id }, relations: ['setor'] });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    await this.funcionarioRepository.update(id, updateFuncionarioDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.funcionarioRepository.delete(id);
    return { message: `Funcionario #${id} removido com sucesso` };
  }
}
