import { InputType, Field, Int, Float } from '@nestjs/graphql';

// Sub-input para recibir el arreglo de productos desde el carrito
@InputType()
export class DetalleVentaInputPOS {
  @Field(() => Int) producto_id: number;
  @Field(() => Int) cantidad: number;
  @Field(() => Float) precio_unitario: number;
}

@InputType()
export class CreateVentaInput {
  @Field(() => Int) cliente_id: number;
  
  // Ahora el empleado es opcional
  @Field(() => Int, { nullable: true }) empleado_id?: number;
  
  @Field(() => Float) total: number;
  @Field() metodo_pago: string;

  // Nuevos campos opcionales al crear (Pedidos Online)
  @Field({ nullable: true }) tipo_venta?: string;
  @Field({ nullable: true }) estado_pedido?: string;
  @Field({ nullable: true }) hora_recogida_estimada?: Date;

  // Agregamos el arreglo de detalles como obligatorio para crear la venta
  @Field(() => [DetalleVentaInputPOS])
  detalles: DetalleVentaInputPOS[];
}