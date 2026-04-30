import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // A URL será http://localhost:8080/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Retorna 200 OK em vez de 201 Created
  @Post('login') // A URL completa será http://localhost:8080/auth/login
  login(@Body() credenciais: Record<string, any>) {
    // Repassa o e-mail e a senha para a sala de interrogatório (Service)
    return this.authService.login(credenciais.email, credenciais.password);
  }
}