import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDto {
  @ApiProperty({ example: 'masterclass' })
  actividad: string;

  @ApiProperty({ example: 'Taller Testing APIs NestJS' })
  nombreActividad: string;

  @ApiProperty({ example: '6489865f45524aa7094cb8ab' })
  espacio: string;

  @ApiProperty({ example: '2018-06-12T19:30', description: 'date-time data' })
  inicio: string;

  @ApiProperty({ example: '2018-06-12T19:30', description: 'date-time data' })
  fin: string;
}
