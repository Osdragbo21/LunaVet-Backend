import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDetalleRecetaInput {
    @Field(() => Int)
    receta_id: number;

    @Field(() => Int)
    medicamento_id: number;

    @Field()
    dosis: string;

    @Field()
    frecuencia: string;

    @Field(() => Int)
    duracion_dias: number;
}