import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('servicios')
export class Servicio {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_servicio: number;

  @Field()
  @Column()
  nombre_servicio: string;

  // NUEVO CAMPO: Solicitado por UI
  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_base: number;
}