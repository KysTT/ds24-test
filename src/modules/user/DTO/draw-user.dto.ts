import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DrawUserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  isVIP?: boolean;
  @Expose()
  reservations?: [];
}
