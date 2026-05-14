import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private usuarioService: UsuarioService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'CHAVE_SECRETA_AGM_2026',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const usuario = await this.usuarioService.findOne(payload.sub);
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    return {
      idUsuario: usuario.idUsuario,
      email: usuario.email,
      nomeUsuario: usuario.nomeUsuario,
      tipo: usuario.tipo,
      codUsuario: usuario.codUsuario,
      setor: usuario.setor,
    };
  }
}
