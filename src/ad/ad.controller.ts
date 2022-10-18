import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from 'src/user.decorator';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  async create(@Body() createAdDto: CreateAdDto, @User() user) {
    return await this.adService.create(createAdDto, user);
  }

  @Get()
  async findAll(@User() user) {
    return await this.adService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adService.update(+id, updateAdDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adService.remove(+id);
  }
}
