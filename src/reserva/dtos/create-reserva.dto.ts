import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/schemas/user.schema';

export class CreateReservaDto {
  @ApiProperty({ example: '09:00 - 12:00' })
  hora: string;

  @ApiProperty({ example: 'Reseva para ...' })
  descripcion: string;

  @ApiProperty({ example: 'Bases de datos' })
  asignatura: string;

  @ApiProperty({ example: 'Raúl Garcia' })
  username: User;

  @ApiProperty({ example: 1 })
  espacio: number;
}
