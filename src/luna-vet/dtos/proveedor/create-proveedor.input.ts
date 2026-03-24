import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateProveedorInput {
    @Field() nombre_empresa: string;
    @Field() contacto_nombre: string;
    @Field() telefono: string;
}