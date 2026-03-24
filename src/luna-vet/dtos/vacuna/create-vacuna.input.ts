import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVacunaInput {
    @Field()
    nombre_vacuna: string;

    @Field({ nullable: true })
    descripcion?: string;
}