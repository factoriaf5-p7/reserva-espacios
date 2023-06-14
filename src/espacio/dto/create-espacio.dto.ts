import { ApiProperty } from '@nestjs/swagger';

export class CreateEspacioDto {
  @ApiProperty({ example: 'A' })
  edificio: string;

  @ApiProperty({ example: '1' })
  aula: string;
}
