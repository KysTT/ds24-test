import { IsNumber, Matches } from 'class-validator';

export class MakeReservationDto {
  @IsNumber()
  user_id: number;

  @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/i)
  startDate: string;

  @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/i)
  endDate: string;

  @IsNumber()
  roomNumber: number;
}
