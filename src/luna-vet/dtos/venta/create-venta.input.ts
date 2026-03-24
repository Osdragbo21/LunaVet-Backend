import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateVentaInput {
    @Field(() => Int) cliente_id: number;
    @Field(() => Int) empleado_id: number;
    @Field(() => Float) total: number;
    @Field() metodo_pago: string;
}