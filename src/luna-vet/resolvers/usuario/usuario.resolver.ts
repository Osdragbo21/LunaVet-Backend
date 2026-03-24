import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CreateUsuarioInput } from '../../dtos/usuario/create-usuario.input';

@Resolver(() => Usuario)
export class UsuarioResolver {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Query(() => [Usuario], { name: 'usuarios' })
    findAll() {
        return this.usuarioService.findAll();
    }

    @Mutation(() => Usuario)
    createUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
        return this.usuarioService.create(createUsuarioInput);
    }
}