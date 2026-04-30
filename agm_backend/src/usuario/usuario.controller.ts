import { Controller, Get, Post, Body } from '@nestjs/common';
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

  @Get() // Responde a pedidos de CONSULTA
  findAll() {
    // Pede ao Service para buscar todos
    return this.usuarioService.findAll();
  }
}
