import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ nullable: false })
  movieUrl: string;

  @ApiProperty({ nullable: true })
  movieDescription?: string;

  @ApiProperty({ nullable: true })
  movieTitle?: string;
}
