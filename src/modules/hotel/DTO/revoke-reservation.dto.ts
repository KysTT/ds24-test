import { IsNumber } from 'class-validator';

export class RevokeReservationDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  roomNumber: number;
}
