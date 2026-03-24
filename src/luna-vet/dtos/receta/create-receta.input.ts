import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRecetaInput {
    @Field(() => Int)
    consulta_id: number;

    @Field({ nullable: true })
    observaciones_generales?: string;
}