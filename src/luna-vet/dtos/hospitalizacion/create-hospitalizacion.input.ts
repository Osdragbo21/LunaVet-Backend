import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHospitalizacionInput {
    @Field(() => Int)
    paciente_id: number;

    @Field(() => Int)
    empleado_id: number;

    @Field()
    fecha_ingreso: Date;

    @Field({ nullable: true })
    fecha_alta?: Date;

    @Field()
    motivo: string;

    @Field()
    estado: string;
}