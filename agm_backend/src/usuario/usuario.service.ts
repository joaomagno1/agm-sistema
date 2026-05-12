import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private mailService: MailService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: [
        { email: createUsuarioDto.email },
        { codUsuario: createUsuarioDto.codUsuario },
      ],
    });

    if (usuarioExistente) {
      throw new ConflictException('E-mail ou código de usuário já registrados!');
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(createUsuarioDto.senha, saltRounds);

    const tokenValidacao = crypto.randomBytes(32).toString('hex');

    const expiracao = new Date();
    expiracao.setHours(expiracao.getHours() + 24);

    const novoUsuario = this.usuarioRepository.create({
      codUsuario: createUsuarioDto.codUsuario,
      nomeUsuario: createUsuarioDto.nomeUsuario,
      email: createUsuarioDto.email,
      senha: senhaCriptografada,
      tipo: createUsuarioDto.tipo || 2,
      statusValidacao: false,
      recoveryToken: tokenValidacao,
      tokenExpires: expiracao,
    });

    const usuarioSalvo = await this.usuarioRepository.save(novoUsuario);

    this.mailService.enviarEmailConfirmacao(usuarioSalvo.email, usuarioSalvo.nomeUsuario, tokenValidacao);

    return {
      idUsuario: usuarioSalvo.idUsuario,
      codUsuario: usuarioSalvo.codUsuario,
      nomeUsuario: usuarioSalvo.nomeUsuario,
      email: usuarioSalvo.email,
      tipo: usuarioSalvo.tipo,
    };
  }

  async findAll() {
    return this.usuarioRepository.find({
      select: ['idUsuario', 'codUsuario', 'nomeUsuario', 'email', 'tipo'],
      relations: ['setor'],
    });
  }

  async findByEmailParaAuth(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async validarEmail(token: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { recoveryToken: token },
    });

    if (!usuario) {
      throw new UnauthorizedException('Token de validação inválido ou inexistente!');
    }

    if (usuario.tokenExpires && usuario.tokenExpires < new Date()) {
      throw new UnauthorizedException('O token de validação expirou. Solicite um novo.');
    }

    usuario.statusValidacao = true;
    usuario.recoveryToken = null;
    usuario.tokenExpires = null;

    await this.usuarioRepository.save(usuario);
    return { message: 'E-mail validado com sucesso! Bem-vindo ao sistema.' };
  }
}
