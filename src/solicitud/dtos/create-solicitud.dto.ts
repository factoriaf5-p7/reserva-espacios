import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDto {
  @ApiProperty({ example: 'Sara' })
  nombre: string;

  @ApiProperty({ example: 'formador' })
  cargo: string;

  @ApiProperty({ example: 'p7' })
  promocion: string;

  @ApiProperty({ example: 'sara@mail.com' })
  email: string;

  @ApiProperty({ example: 'masterclass' })
  tipo: string;

  @ApiProperty({ example: 'Taller Testing APIs NestJS' })
  nombreActividad: string;

  @ApiProperty({ example: '2023/06/14' })
  start: Date;

  @ApiProperty({ example: '2023/06/14' })
  end: Date;

  @ApiProperty({ example: 'Miércoles' })
  dia: string;

  @ApiProperty({ example: '13:00' })
  horaInicio: string;

  @ApiProperty({ example: '14:00' })
  horaFin: string;
}
