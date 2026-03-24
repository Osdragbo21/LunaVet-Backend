import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Consulta } from '../consultas/consulta.entity';

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
}