import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateServicioInput {
    @Field() nombre_servicio: string;
    @Field(() => Float) costo_base: number;
}