import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Espacio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  edificio: string;

  @Column()
  aula: string;
}
