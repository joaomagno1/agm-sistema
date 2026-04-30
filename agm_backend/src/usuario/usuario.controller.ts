import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario') // Define que a URL será http://localhost:8080/usuario
export class UsuarioController {
  // O Controller recruta o Service automaticamente através do construtor
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post() // Responde a pedidos de CRIAÇÃO
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    // Repassa o trabalho pesado para o Service
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validar/:token') // A rota será: http://localhost:8080/usuario/validar/TOKEN_AQUI
  validarEmail(@Param('token') token: string) {
    return this.usuarioService.validarEmail(token);
  }
}
