import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateVentaInput {
  @Field(() => Int)
  id_venta: number;

  @Field({ nullable: true })
  fecha_venta?: Date;

  @Field({ nullable: true })
  tipo_venta?: string;

  @Field({ nullable: true })
  estado_pedido?: string;

  @Field({ nullable: true })
  metodo_pago?: string;

  @Field(() => Float, { nullable: true })
  total?: number;
}