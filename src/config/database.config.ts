import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'mysql',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'espacios',
}));
