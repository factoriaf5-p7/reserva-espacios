import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'mysql',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'espacios',
}));
