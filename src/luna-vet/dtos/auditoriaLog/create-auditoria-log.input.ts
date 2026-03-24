import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAuditoriaLogInput {
    @Field(() => Int)
    usuario_id: number;

    @Field()
    accion: string;

    @Field()
    tabla_afectada: string;
}