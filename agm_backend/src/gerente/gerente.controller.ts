import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GerenteService } from './gerente.service';
import { CreateGerenteDto } from './dto/create-gerente.dto';
import { UpdateGerenteDto } from './dto/update-gerente.dto';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createGerenteDto: CreateGerenteDto) {
    return this.gerenteService.create(createGerenteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.gerenteService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gerenteService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGerenteDto: UpdateGerenteDto) {
    return this.gerenteService.update(+id, updateGerenteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gerenteService.remove(+id);
  }
}
