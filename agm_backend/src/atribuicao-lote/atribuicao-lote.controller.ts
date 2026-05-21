import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtribuicaoLoteService } from './atribuicao-lote.service';
import { CreateAtribuicaoLoteDto } from './dto/create-atribuicao-lote.dto';
import { UpdateAtribuicaoLoteDto } from './dto/update-atribuicao-lote.dto';

@Controller('atribuicao-lote')
export class AtribuicaoLoteController {
  constructor(private readonly atribuicaoLoteService: AtribuicaoLoteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: CreateAtribuicaoLoteDto) {
    return this.atribuicaoLoteService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.atribuicaoLoteService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atribuicaoLoteService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateAtribuicaoLoteDto) {
    return this.atribuicaoLoteService.update(+id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atribuicaoLoteService.remove(+id);
  }
}
