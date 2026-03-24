import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateDetalleServicioVentaInput {
    @Field(() => Int) venta_id: number;
    @Field(() => Int) servicio_id: number;
    @Field(() => Float) costo_aplicado: number;
}