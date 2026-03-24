import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('proveedores')
export class Proveedor {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_proveedor: number;

    @Field()
    @Column()
    nombre_empresa: string;

    @Field()
    @Column()
    contacto_nombre: string;

    @Field()
    @Column()
    telefono: string;
}