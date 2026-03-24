import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../ventas/venta.entity';
import { Servicio } from '../servicios/servicio.entity';

@ObjectType()
@Entity('detalle_servicios_venta')
export class DetalleServicioVenta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_det_ser: number;

    @Field(() => Int)
    @Column()
    venta_id: number;

    @Field(() => Venta)
    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'venta_id' })
    venta: Venta;

    @Field(() => Int)
    @Column()
    servicio_id: number;

    @Field(() => Servicio)
    @ManyToOne(() => Servicio)
    @JoinColumn({ name: 'servicio_id' })
    servicio: Servicio;

    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    costo_aplicado: number;
}