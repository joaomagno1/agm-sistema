import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsuarioModule, // Trazemos a inteligência dos Usuários
    PassportModule,
    JwtModule.register({
      secret: 'CHAVE_SECRETA_AGM_2026', // A assinatura sagrada do império
      signOptions: { expiresIn: '2h' }, // O passe mágico durará 2 horas
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}