import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Vacuna } from '../vacunas/vacuna.entity';

// Transformador reutilizable para evitar el choque entre string de Postgres y Date de GraphQL
const dateTransformer = {
  to: (value: any) => value,
  from: (value: any) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    return new Date(typeof value === 'string' && value.length === 10 ? `${value}T12:00:00Z` : value);
  }
};

@ObjectType()
@Entity('registro_vacunacion')
export class RegistroVacunacion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_registro_vac: number;

  @Field(() => Int)
  @Column()
  paciente_id: number;

  @Field(() => Paciente)
  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @Field(() => Int)
  @Column()
  vacuna_id: number;

  @Field(() => Vacuna)
  @ManyToOne(() => Vacuna)
  @JoinColumn({ name: 'vacuna_id' })
  vacuna: Vacuna;

  // ==========================================
  // APLICAMOS TRANSFORMADOR DE FECHAS
  // ==========================================
  @Field()
  @Column({ 
    type: 'date',
    transformer: dateTransformer
  })
  fecha_aplicacion: Date;

  @Field({ nullable: true })
  @Column({ 
    type: 'date', 
    nullable: true,
    transformer: dateTransformer
  })
  proxima_dosis: Date;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  peso_al_vacunar: number;
}