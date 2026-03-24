import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateVeterinarioEspecialidadInput {
    @Field(() => Int)
    empleado_id: number;

    @Field()
    especialidad: string;
}