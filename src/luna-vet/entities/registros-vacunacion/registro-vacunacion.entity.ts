import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Vacuna } from '../vacunas/vacuna.entity';

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

  @Field()
  @Column({ type: 'date' })
  fecha_aplicacion: Date;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  proxima_dosis: Date;

  // ==========================================
  // NUEVO CAMPO SOLICITADO: Peso al vacunar
  // Lo hacemos nullable en BD para no romper registros antiguos (seed)
  // ==========================================
  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  peso_al_vacunar: number;
}