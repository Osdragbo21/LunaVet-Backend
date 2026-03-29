import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Cita } from '../citas/cita.entity';
import { Hospitalizacion } from '../hospitalizaciones/hospitalizacion.entity';

@ObjectType()
@Entity('pacientes')
export class Paciente {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Field(() => Int)
  @Column()
  cliente_id: number;

  // Relación: Muchos pacientes pertenecen a un cliente
  @Field(() => Cliente)
  @ManyToOne(() => Cliente, (cliente) => cliente.pacientes)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  especie: string; // Ej: Perro, Gato

  @Field()
  @Column()
  raza: string;

  @Field()
  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Field()
  @Column()
  genero: string;

  @Field()
  @Column()
  color: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  alergias: string;

  // ==========================================
  // RELACIONES DEL EXPEDIENTE MÉDICO
  // ==========================================
  @Field(() => [Cita], { nullable: true })
  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];

  @Field(() => [Hospitalizacion], { nullable: true })
  @OneToMany(() => Hospitalizacion, (hospitalizacion) => hospitalizacion.paciente)
  hospitalizaciones: Hospitalizacion[];
}