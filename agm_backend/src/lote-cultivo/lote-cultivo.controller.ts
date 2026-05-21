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
import { LoteCultivoService } from './lote-cultivo.service';
import { CreateLoteCultivoDto } from './dto/create-lote-cultivo.dto';
import { UpdateLoteCultivoDto } from './dto/update-lote-cultivo.dto';

@Controller('lote-cultivo')
export class LoteCultivoController {
  constructor(private readonly loteCultivoService: LoteCultivoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: CreateLoteCultivoDto) {
    return this.loteCultivoService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.loteCultivoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteCultivoService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateLoteCultivoDto) {
    return this.loteCultivoService.update(+id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteCultivoService.remove(+id);
  }
}
