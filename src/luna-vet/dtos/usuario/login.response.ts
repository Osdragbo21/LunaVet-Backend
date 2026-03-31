import { ObjectType, Field } from '@nestjs/graphql';
import { Usuario } from '../../entities/usuarios/usuario.entity';

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

    @Field(() => Usuario)
    usuario: Usuario;
}