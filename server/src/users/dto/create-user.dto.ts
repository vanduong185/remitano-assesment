import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ nullable: false, uniqueItems: true })
  username: string;

  @ApiProperty({ nullable: false })
  password: string;
}
