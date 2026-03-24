import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEmpleadoInput {
    @Field(() => Int)
    usuario_id: number;

    @Field()
    nombre: string;

    @Field()
    apellido_paterno: string;

    @Field()
    apellido_materno: string;

    @Field()
    telefono: string;

    @Field()
    email_empleado: string;

    @Field()
    puesto: string;

    @Field()
    fecha_contratacion: Date;
}