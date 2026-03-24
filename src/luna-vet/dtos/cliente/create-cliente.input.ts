import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
    @Field(() => Int)
    usuario_id: number;

    @Field()
    nombre_completo: string;

    @Field()
    telefono_principal: string;

    @Field()
    direccion: string;
}