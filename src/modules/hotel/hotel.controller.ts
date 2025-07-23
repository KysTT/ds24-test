import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Room } from '@prisma/client';
import { GetAllRoomsPeriodDto } from './DTO/get-all-rooms-period.dto';
import { MakeReservationDto } from './DTO/make-reservation.dto';
import { RevokeReservationDto } from './DTO/revoke-reservation.dto';
import { CreateRoomDto } from './DTO/create-room.dto';

@Controller('api/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('rooms')
  async getAllRooms(): Promise<Room[]> {
    return this.hotelService.getAllRooms();
  }

  @Post('createRoom')
  async createRoom(@Body() data: CreateRoomDto) {
    return this.hotelService.createRoom(data);
  }

  @Get('roomsPeriod')
  async getAllRoomsPeriod(@Body() data: GetAllRoomsPeriodDto): Promise<Room[]> {
    return this.hotelService.getAllRoomsPeriod(data);
  }

  @Post('makeReservation')
  async makeReservation(@Body() data: MakeReservationDto) {
    return this.hotelService.makeReservation(data);
  }

  @Post('revokeReservation')
  async revokeReservation(@Body() data: RevokeReservationDto) {
    return this.hotelService.revokeReservation(data);
  }
}
