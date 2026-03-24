import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Receta } from '../recetas/receta.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';

@ObjectType()
@Entity('detalle_receta')
export class DetalleReceta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_detalle_receta: number;

    @Field(() => Int)
    @Column()
    receta_id: number;

    @Field(() => Receta)
    @ManyToOne(() => Receta)
    @JoinColumn({ name: 'receta_id' })
    receta: Receta;

    @Field(() => Int)
    @Column()
    medicamento_id: number;

    @Field(() => Medicamento)
    @ManyToOne(() => Medicamento)
    @JoinColumn({ name: 'medicamento_id' })
    medicamento: Medicamento;

    @Field()
    @Column()
    dosis: string;

    @Field()
    @Column()
    frecuencia: string;

    @Field(() => Int)
    @Column()
    duracion_dias: number;
}