import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

    // NUEVA MUTACIÓN: Suspender/Activar Usuario
    @Mutation(() => Usuario)
    toggleEstadoUsuario(
        @Args('id_usuario', { type: () => Int }) id_usuario: number,
        @Args('activo', { type: () => Boolean }) activo: boolean,
    ) {
        return this.usuarioService.toggleEstado(id_usuario, activo);
    }
}