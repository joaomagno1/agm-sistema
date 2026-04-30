import { Injectable, ConflictException } from '@nestjs/common';
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
        { username: createUsuarioDto.username }
      ],
    });

    if (usuarioExistente) {
      throw new ConflictException('E-mail ou Username já registrados no império!');
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(createUsuarioDto.password, saltRounds);

    // Token de 64 caracteres único para a validação do e-mail
    const tokenValidacao = crypto.randomBytes(32).toString('hex');
    
    // expiração do token
    const expiracao = new Date();
    expiracao.setHours(expiracao.getHours() + 24);

    const novoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: senhaCriptografada,
      status_validacao: false, // Nasce bloqueado
      recovery_token: tokenValidacao, // Guardamos o token aqui temporariamente
      token_expires: expiracao,
    });

    const usuarioSalvo = await this.usuarioRepository.save(novoUsuario);

    this.mailService.enviarEmailConfirmacao(usuarioSalvo.email, usuarioSalvo.firstName, tokenValidacao);

    delete (usuarioSalvo as any).password;
    delete (usuarioSalvo as any).recovery_token; // Esconde o token da resposta

    return usuarioSalvo;
  }

  async findAll() {
    return this.usuarioRepository.find({
      select: ['idUsuario', 'firstName', 'lastName', 'username', 'email'],
    });
  }

  // Função secreta dedicada apenas ao módulo de Autenticação
  async findByEmailParaAuth(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async validarEmail(token: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { recovery_token: token },
    });

    if (!usuario) {
      throw new UnauthorizedException('Selo de validação falso ou inexistente!');
    }

    // Verifica se o tempo de 24h já expirou
    if (usuario.token_expires && usuario.token_expires < new Date()) {
      throw new UnauthorizedException('O tempo do seu selo expirou. Solicite um novo recrutamento.');
    }

    // Consagra o usuário como cidadão oficial
    usuario.status_validacao = true;
    usuario.recovery_token = null; // Destrói o token para não ser reusado
    usuario.token_expires = null;

    await this.usuarioRepository.save(usuario);
    return { message: 'Identidade validada com sucesso! Bem-vindo ao império.' };
  }
}
