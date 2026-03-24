import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Rol } from '../../entities/roles/rol.entity';
import { RolService } from '../../services/rol/rol.service';
import { CreateRolInput } from '../../dtos/rol/create-rol.input';

@Resolver(() => Rol)
export class RolResolver {
    constructor(private readonly rolService: RolService) {}

    @Query(() => [Rol], { name: 'roles' })
    findAll() {
        return this.rolService.findAll();
    }

    @Mutation(() => Rol)
    createRol(@Args('createRolInput') createRolInput: CreateRolInput) {
        return this.rolService.create(createRolInput);
    }
}