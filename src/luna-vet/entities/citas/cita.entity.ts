import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Empleado } from '../empleados/empleado.entity';
import { Consulta } from '../consultas/consulta.entity';

@ObjectType()
@Entity('citas')
export class Cita {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_cita: number;

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
    fecha_hora: Date;

    @Field()
    @Column({ type: 'text' })
    motivo: string;

    @Field()
    @Column()
    estado: string; // Ej: Pendiente, Completada, Cancelada

    // Relación: Una cita puede convertirse en una consulta
    @Field(() => Consulta, { nullable: true })
    @OneToOne(() => Consulta, (consulta) => consulta.cita)
    consulta?: Consulta;
}