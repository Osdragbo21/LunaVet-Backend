import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../ventas/venta.entity';
import { Producto } from '../productos/producto.entity';

@ObjectType()
@Entity('detalle_venta')
export class DetalleVenta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_detalle: number;

    @Field(() => Int)
    @Column()
    venta_id: number;

    @Field(() => Venta)
    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'venta_id' })
    venta: Venta;

    @Field(() => Int)
    @Column()
    producto_id: number;

    @Field(() => Producto)
    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @Field(() => Int)
    @Column()
    cantidad: number;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario: number;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
}