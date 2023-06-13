import { Module } from '@nestjs/common';
import { EspacioController } from './espacio.controller';
import { EspacioService } from './espacio.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Espacio, EspacioSchema } from './schemas/espacio.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Espacio.name, schema: EspacioSchema }]),
    // TypeOrmModule.forFeature([Espacio])
  ],
  controllers: [EspacioController],
  providers: [EspacioService],
})
export class EspacioModule {}
