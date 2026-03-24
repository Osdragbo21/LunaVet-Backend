import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePacienteInput {
    @Field(() => Int)
    cliente_id: number;

    @Field()
    nombre: string;

    @Field()
    especie: string;

    @Field()
    raza: string;

    @Field()
    fecha_nacimiento: Date;

    @Field()
    genero: string;

    @Field()
    color: string;

    @Field({ nullable: true })
    alergias?: string;
}