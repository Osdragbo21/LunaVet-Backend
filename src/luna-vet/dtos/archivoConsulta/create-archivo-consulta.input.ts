import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateArchivoConsultaInput {
    @Field(() => Int)
    consulta_id: number;

    @Field()
    url_archivo: string;

    @Field()
    tipo_documento: string;
}