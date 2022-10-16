import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdController],
  providers: [AdService],
  exports: [PrismaModule],
})
export class AdModule {}
