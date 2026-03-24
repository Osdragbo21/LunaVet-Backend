import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateConsultaInput {
    @Field(() => Int)
    cita_id: number;

    @Field(() => Float)
    peso_actual: number;

    @Field(() => Float)
    temperatura: number;

    @Field(() => Int)
    frecuencia_cardiaca: number;

    @Field()
    diagnostico: string;

    @Field()
    observaciones: string;
}