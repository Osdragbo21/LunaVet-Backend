import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Consulta } from '../consultas/consulta.entity';

@ObjectType()
@Entity('archivos_consulta')
export class ArchivoConsulta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_archivo: number;

    @Field(() => Int)
    @Column()
    consulta_id: number;

    @Field(() => Consulta)
    @ManyToOne(() => Consulta, (consulta) => consulta.archivos)
    @JoinColumn({ name: 'consulta_id' })
    consulta: Consulta;

    @Field()
    @Column()
    url_archivo: string;

    @Field()
    @Column()
    tipo_documento: string; // Ej: Radiografía, PDF Resultados

    @Field()
    @CreateDateColumn()
    fecha_subida: Date;
}