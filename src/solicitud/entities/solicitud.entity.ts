// import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Solicitud {
  //@ApiProperty({ example: 99 })
  @PrimaryGeneratedColumn()
  id: number;

  //@ApiProperty({ example: 'Manuel Torres Gil' })
  @Column()
  nombre: string;

  //@ApiProperty({ example: 'Profesor Titular de Universidad' })
  @Column()
  cargo: string;

  //@ApiProperty({ example: 'P7' })
  @Column()
  promocion: string;

  //@ApiProperty({ example: 'mtorres@ual.es' })
  @Column()
  email: string;

  //@ApiProperty({ example: 'Masterclass' })
  @Column()
  tipo: string;

  //@ApiProperty({ example: 'Taller Testing APIs NestJS' })
  @Column()
  nombreActividad: string;

  //@ApiProperty({ example: '2022-03-14' })
  @Column()
  start: Date;

  //@ApiProperty({ example: '2022-03-28' })
  @Column()
  end: Date;

  //@ApiProperty({ example: 'Martes' })
  @Column()
  dia: string;

  //@ApiProperty({ example: '10' })
  @Column()
  horaInicio: string;

  //@ApiProperty({ example: '12' })
  @Column()
  horaFin: string;
}
