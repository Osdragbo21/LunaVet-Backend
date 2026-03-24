import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('vacunas')
export class Vacuna {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_vacuna: number;

    @Field()
    @Column()
    nombre_vacuna: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    descripcion: string;
}