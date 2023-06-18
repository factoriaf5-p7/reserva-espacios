import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'lisa', description: 'Nombre de user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'lisa@mail.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'Contraseña' })
  @IsNotEmpty()
  password: string;

  createAt: Date;

  updateAt: Date;

  hash_refresh_token: string;
}

/* {
"name":"paco",
"email":"paco@mail.com",
"password":"1234"
} */
