import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Empleado } from '../empleados/empleado.entity';

@ObjectType()
@Entity('hospitalizaciones')
export class Hospitalizacion {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_hospitalizacion: number;

    @Field(() => Int)
    @Column()
    paciente_id: number;

    @Field(() => Paciente)
    @ManyToOne(() => Paciente)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @Field(() => Int)
    @Column()
    empleado_id: number;

    @Field(() => Empleado)
    @ManyToOne(() => Empleado)
    @JoinColumn({ name: 'empleado_id' })
    empleado: Empleado;

    @Field()
    @Column({ type: 'timestamp' })
    fecha_ingreso: Date;

    @Field({ nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    fecha_alta: Date;

    @Field()
    @Column()
    motivo: string;

    @Field()
    @Column()
    estado: string; // Ej: Ingresado, Alta, Crítico
}