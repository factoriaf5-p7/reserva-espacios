import { PickType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

// export class LoginDto extends PickType(RegisterDto, [
//   'email',
//   'password',
// ] as const) {}

export class LoginDto {
  @ApiProperty({ example: 'lisa@mail.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'Contraseña' })
  @IsNotEmpty()
  password: string;
}
