import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateDetalleVentaInput {
    @Field(() => Int) venta_id: number;
    @Field(() => Int) producto_id: number;
    @Field(() => Int) cantidad: number;
    @Field(() => Float) precio_unitario: number;
    @Field(() => Float) subtotal: number;
}