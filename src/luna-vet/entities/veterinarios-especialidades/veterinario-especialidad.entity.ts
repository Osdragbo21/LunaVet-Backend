import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../empleados/empleado.entity';

@ObjectType()
@Entity('veterinarios_especialidades')
export class VeterinarioEspecialidad {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_vet_esp: number;

  @Field(() => Int)
  @Column()
  empleado_id: number;

  // Relación: Muchas especialidades pueden pertenecer a un empleado
  @Field(() => Empleado)
  @ManyToOne(() => Empleado, (empleado) => empleado.especialidades)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @Field()
  @Column()
  especialidad: string; // Ej: "Cirugía", "Dermatología"
}