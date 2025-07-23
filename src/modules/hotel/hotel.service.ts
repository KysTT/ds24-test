import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Room } from '@prisma/client';
import { GetAllRoomsPeriodDto } from './DTO/get-all-rooms-period.dto';
import { MakeReservationDto } from './DTO/make-reservation.dto';
import { RevokeReservationDto } from './DTO/revoke-reservation.dto';
import { CreateRoomDto } from './DTO/create-room.dto';

@Injectable()
export class HotelService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllRooms(): Promise<Room[]> {
    return this.prismaService.room.findMany();
  }

  async createRoom(data: CreateRoomDto): Promise<Room> {
    let room;
    try {
      room = await this.prismaService.room.create({
        data: { number: data.roomNumber },
      });
    } catch (e) {
      if (e.code == 'P2002')
        throw new BadRequestException('Такой номер уже существует');
      else throw new HttpException('Неудалось создать номер', 500);
    }
    return room;
  }

  async getAllRoomsPeriod(data: GetAllRoomsPeriodDto): Promise<Room[]> {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (end < start) {
      throw new BadRequestException(
        'Конец периода должен идти после его начала',
      );
    }

    try {
      return this.prismaService.room.findMany({
        where: {
          reservations: {
            none: {
              AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException('Ошибка при получении списка номеров', 500);
    }
  }

  async makeReservation(data: MakeReservationDto) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: data.user_id },
    });
    const room = await this.prismaService.room.findUniqueOrThrow({
      where: { number: data.roomNumber },
    });

    try {
      await this.prismaService.$transaction(async (tx) => {
        const conflicts = await tx.reservation.findMany({
          where: {
            AND: [
              { startDate: { lte: new Date(data.endDate) } },
              { endDate: { gte: new Date(data.startDate) } },
            ],
          },
        });
        if (conflicts.length)
          throw new BadRequestException('Номер на выбранный период уже занят');
        await tx.reservation.create({
          data: {
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            IsBookedByVIP: user.isVIP,
            room_id: room.id,
            user_id: user.id,
          },
        });
      });
    } catch (e) {
      throw new HttpException('Неполучилось забронировать номер', 500);
    }
    return `Место в номере ${room.number} успешно забронировано`;
  }

  async revokeReservation(data: RevokeReservationDto) {
    try {
      await this.prismaService.reservation.deleteMany({
        where: { room: { number: data.roomNumber }, user_id: data.user_id },
      });
    } catch (e) {
      throw new HttpException('Неудалось отменить бронь', 500);
    }
    return `Бронь в номере ${data.roomNumber} успешно отменена`;
  }
}
