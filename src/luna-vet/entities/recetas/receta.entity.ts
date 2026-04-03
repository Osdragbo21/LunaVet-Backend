import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Consulta } from '../consultas/consulta.entity';
import { DetalleReceta } from '../detalles-receta/detalle-receta.entity';

@ObjectType()
@Entity('recetas')
export class Receta {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_receta: number;

  @Field(() => Int)
  @Column()
  consulta_id: number;

  @Field(() => Consulta)
  @ManyToOne(() => Consulta)
  @JoinColumn({ name: 'consulta_id' })
  consulta: Consulta;

  @Field()
  @CreateDateColumn()
  fecha_emision: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  observaciones_generales: string;

  // NUEVA RELACIÓN: Para que GraphQL pueda devolver los detalles de los medicamentos
  @Field(() => [DetalleReceta], { nullable: true })
  @OneToMany(() => DetalleReceta, detalle => detalle.receta)
  detalles: DetalleReceta[];
}