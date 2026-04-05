import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class DetalleVentaInputPOS {
  @Field(() => Int) producto_id: number;
  @Field(() => Int) cantidad: number;
  @Field(() => Float) precio_unitario: number;
}

@InputType()
export class DetalleServicioInputPOS {
  @Field(() => Int) servicio_id: number;
  @Field(() => Float) costo_aplicado: number;
}

@InputType()
export class CreateVentaInput {
  @Field(() => Int) cliente_id: number;

  @Field(() => Int, { nullable: true }) empleado_id?: number;

  @Field(() => Float) total: number;
  @Field() metodo_pago: string;

  @Field({ nullable: true }) tipo_venta?: string;
  @Field({ nullable: true }) estado_pedido?: string;
  @Field({ nullable: true }) hora_recogida_estimada?: Date;

  @Field(() => [DetalleVentaInputPOS], { nullable: true })
  detalles_productos?: DetalleVentaInputPOS[];

  @Field(() => [DetalleServicioInputPOS], { nullable: true })
  detalles_servicios?: DetalleServicioInputPOS[];
}
