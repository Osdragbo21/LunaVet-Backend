import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterClienteInput {
  // Datos para la tabla Usuarios
    @Field()
    username: string;

    @Field()
    password_hash: string;

    // Datos para la tabla Clientes
    @Field()
    nombre_completo: string;

    @Field()
    telefono_principal: string;

    @Field()
    direccion: string;
}