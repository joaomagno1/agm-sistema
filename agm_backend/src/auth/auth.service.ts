import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

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
      throw new UnauthorizedException('Acesso negado! Confirme o seu e-mail antes de entrar.');
    }

    const payload = { sub: usuario.idUsuario, email: usuario.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nomeUsuario,
        email: usuario.email,
      },
    };
  }
}
