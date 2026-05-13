import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AplicacaoInsumoService } from './aplicacao-insumo.service';
import { CreateAplicacaoInsumoDto } from './dto/create-aplicacao-insumo.dto';
import { UpdateAplicacaoInsumoDto } from './dto/update-aplicacao-insumo.dto';

@Controller('aplicacao-insumo')
export class AplicacaoInsumoController {
  constructor(private readonly aplicacaoInsumoService: AplicacaoInsumoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: CreateAplicacaoInsumoDto) {
    return this.aplicacaoInsumoService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aplicacaoInsumoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aplicacaoInsumoService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateAplicacaoInsumoDto) {
    return this.aplicacaoInsumoService.update(+id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicacaoInsumoService.remove(+id);
  }
}
