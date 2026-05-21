import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  private async gerarRefreshToken(usuarioId: number): Promise<string> {
    const random = crypto.randomBytes(32).toString('hex');
    const raw = `${usuarioId}.${random}`;
    const hash = await bcrypt.hash(raw, 10);
    await this.usuarioRepository.update(usuarioId, { refreshToken: hash });
    return raw;
  }

  private async gerarTokens(usuario: Usuario) {
    const payload = { sub: usuario.idUsuario, email: usuario.email };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.gerarRefreshToken(usuario.idUsuario),
    ]);
    return { access_token, refresh_token };
  }

  async login(email: string, senhaPlana: string) {
    const usuario = await this.usuarioService.findByEmailParaAuth(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const senhaValida = await bcrypt.compare(senhaPlana, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    if (!usuario.statusValidacao) {
      throw new UnauthorizedException(
        'Acesso negado! Confirme o seu e-mail antes de entrar.',
      );
    }

    const tokens = await this.gerarTokens(usuario);

    return {
      ...tokens,
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nomeUsuario,
        email: usuario.email,
        tipo: usuario.tipo,
        codUsuario: usuario.codUsuario,
      },
    };
  }

  async refresh(refreshTokenRaw: string) {
    const parts = refreshTokenRaw.split('.');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Refresh token inválido.');
    }

    const usuarioId = parseInt(parts[0], 10);
    if (isNaN(usuarioId)) {
      throw new UnauthorizedException('Refresh token inválido.');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: usuarioId },
      select: [
        'idUsuario',
        'refreshToken',
        'email',
        'nomeUsuario',
        'tipo',
        'codUsuario',
        'statusValidacao',
        'senha',
      ],
    });

    if (!usuario || !usuario.refreshToken) {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }

    const valido = await bcrypt.compare(refreshTokenRaw, usuario.refreshToken);
    if (!valido) {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }

    if (!usuario.statusValidacao) {
      throw new UnauthorizedException('Conta não validada.');
    }

    const tokens = await this.gerarTokens(usuario);

    return {
      ...tokens,
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nomeUsuario,
        email: usuario.email,
        tipo: usuario.tipo,
        codUsuario: usuario.codUsuario,
      },
    };
  }

  async logout(idUsuario: number) {
    await this.usuarioRepository.update(idUsuario, { refreshToken: null });
    return { message: 'Sessão encerrada com sucesso.' };
  }
}
