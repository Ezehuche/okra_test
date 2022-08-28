import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UpdateUtilDto } from './dto/update-util.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.utilsService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.utilsService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUtilDto: UpdateUtilDto) {
    return this.utilsService.update(+id, updateUtilDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.utilsService.remove(+id);
  }
}
