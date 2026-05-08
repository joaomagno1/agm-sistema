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
      throw new UnauthorizedException('Credenciais inválidas, invasor!');
    }

    const senhaValida = await bcrypt.compare(senhaPlana, usuario.password);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas, invasor!');
    }

    // --- A NOVA TRAVA DE SEGURANÇA AQUI ---
    if (!usuario.status_validacao) {
      throw new UnauthorizedException('Acesso negado! Confirme a sua identidade através do corvo (e-mail) que lhe enviámos.');
    }
    // --------------------------------------

    const payload = { sub: usuario.idUsuario, email: usuario.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.firstName, // Certifique-se de que está firstName aqui
        email: usuario.email,
      }
    };
  }
}