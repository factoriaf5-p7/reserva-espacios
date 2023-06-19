import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'lisa', description: 'nombre de la usuaria' })
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @ApiProperty({ example: 'lisa@mail.com', description: 'email usuaria' })
  email: string;
  @ApiProperty({ example: '1234', description: 'contraseña de la usuaria' })
  @IsNotEmpty()
  password: string;
}
