import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCitaInput {
    @Field(() => Int)
    paciente_id: number;

    @Field(() => Int)
    empleado_id: number;

    @Field()
    fecha_hora: Date;

    @Field()
    motivo: string;

    @Field()
    estado: string;
}