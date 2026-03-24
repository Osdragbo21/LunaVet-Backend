import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('medicamentos')
export class Medicamento {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_medicamento: number;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    principio_activo: string;

    @Field()
    @Column()
    presentacion: string;
}