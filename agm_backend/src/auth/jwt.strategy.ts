import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrai o token do cabeçalho da requisição (Bearer Token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Rejeita tokens vencidos
      secretOrKey: 'CHAVE_SECRETA_AGM_2026', // A mesma chave do seu AuthModule!
    });
  }

  // Se o token for válido, esta função é chamada. 
  // O que ela retornar ficará disponível em "req.user" nas suas rotas.
  async validate(payload: any) {
    return { idUsuario: payload.sub, email: payload.email };
  }
}