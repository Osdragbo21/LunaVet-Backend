import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRegistroVacunacionInput {
    @Field(() => Int)
    paciente_id: number;

    @Field(() => Int)
    vacuna_id: number;

    @Field()
    fecha_aplicacion: Date;

    @Field({ nullable: true })
    proxima_dosis?: Date;
}