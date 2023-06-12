import { Module } from '@nestjs/common';
import { EspacioController } from './espacio.controller';
import { EspacioService } from './espacio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Espacio } from './entities/espacio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Espacio])],
  controllers: [EspacioController],
  providers: [EspacioService],
})
export class EspacioModule {}
