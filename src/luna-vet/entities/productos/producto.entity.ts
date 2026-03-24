import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from '../proveedores/proveedor.entity';

@ObjectType()
@Entity('productos')
export class Producto {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Field(() => Int)
    @Column()
    proveedor_id: number;

    @Field(() => Proveedor)
    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor: Proveedor;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    categoria: string;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_venta: number;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_compra: number;

    @Field(() => Int)
    @Column()
    stock_actual: number;

    @Field(() => Int)
    @Column()
    stock_minimo: number;
}