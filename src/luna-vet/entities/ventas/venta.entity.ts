import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Empleado } from '../empleados/empleado.entity';

@ObjectType()
@Entity('ventas')
export class Venta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_venta: number;

    @Field(() => Int)
    @Column()
    cliente_id: number;

    @Field(() => Cliente)
    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @Field(() => Int)
    @Column()
    empleado_id: number;

    @Field(() => Empleado)
    @ManyToOne(() => Empleado)
    @JoinColumn({ name: 'empleado_id' })
    empleado: Empleado;

    @Field()
    @CreateDateColumn()
    fecha_venta: Date;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Field()
    @Column()
    metodo_pago: string;
}