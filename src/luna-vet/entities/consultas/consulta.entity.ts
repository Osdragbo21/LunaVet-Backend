import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cita } from '../citas/cita.entity';
import { ArchivoConsulta } from '../archivos-consulta/archivo-consulta.entity';

@ObjectType()
@Entity('consultas')
export class Consulta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_consulta: number;

    @Field(() => Int)
    @Column({ unique: true })
    cita_id: number;

    @Field(() => Cita)
    @OneToOne(() => Cita, (cita) => cita.consulta)
    @JoinColumn({ name: 'cita_id' })
    cita: Cita;

    @Field(() => Float)
    @Column({ type: 'float' })
    peso_actual: number;

    @Field(() => Float)
    @Column({ type: 'float' })
    temperatura: number;

    @Field(() => Int)
    @Column()
    frecuencia_cardiaca: number;

    @Field()
    @Column({ type: 'text' })
    diagnostico: string;

    @Field()
    @Column({ type: 'text' })
    observaciones: string;

    @Field(() => [ArchivoConsulta], { nullable: true })
    @OneToMany(() => ArchivoConsulta, (archivo) => archivo.consulta)
    archivos: ArchivoConsulta[];
}