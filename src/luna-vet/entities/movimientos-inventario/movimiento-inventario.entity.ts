import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from '../productos/producto.entity';
import { Empleado } from '../empleados/empleado.entity';

@ObjectType()
@Entity('movimientos_inventario')
export class MovimientoInventario {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_movimiento: number;

    @Field(() => Int)
    @Column()
    producto_id: number;

    @Field(() => Producto)
    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @Field(() => Int)
    @Column()
    empleado_id: number;

    @Field(() => Empleado)
    @ManyToOne(() => Empleado)
    @JoinColumn({ name: 'empleado_id' })
    empleado: Empleado;

    @Field()
    @Column()
    tipo_movimiento: string; // 'Entrada' o 'Salida'

    @Field(() => Int)
    @Column()
    cantidad: number;

    @Field()
    @Column()
    motivo: string;

    @Field()
    @CreateDateColumn()
    fecha: Date;
}