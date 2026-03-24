import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMedicamentoInput {
    @Field()
    nombre: string;

    @Field()
    principio_activo: string;

    @Field()
    presentacion: string;
}