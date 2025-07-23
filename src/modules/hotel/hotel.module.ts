import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [PrismaModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
