import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcryptjs'; // <-- Mudamos para bcryptjs!

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // 1. Verifica se o e-mail já existe no império
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException(
        'Este e-mail já pertence a outro membro do império!',
      );
    }

    // 2. Criptografa a senha com bcryptjs
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(
      createUsuarioDto.senha,
      saltRounds,
    );

    // 3. Prepara o novo soldado
    const novoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: senhaCriptografada,
    });

    // 4. Salva no banco de dados
    const usuarioSalvo = await this.usuarioRepository.save(novoUsuario);

    // 5. Apaga a senha do objeto de retorno para não ir para o frontend
    delete (usuarioSalvo as any).senha;
    
    return usuarioSalvo;
  }

  async findAll() {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email'],
    });
  }
}
