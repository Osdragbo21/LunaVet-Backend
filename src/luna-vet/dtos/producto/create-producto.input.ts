import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductoInput {
    @Field(() => Int) proveedor_id: number;
    @Field() nombre: string;
    @Field() categoria: string;
    @Field(() => Float) precio_venta: number;
    @Field(() => Float) precio_compra: number;
    @Field(() => Int) stock_actual: number;
    @Field(() => Int) stock_minimo: number;
}