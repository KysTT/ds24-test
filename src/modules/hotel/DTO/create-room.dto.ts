import { IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  roomNumber: number;
}
