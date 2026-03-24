import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Empleado } from '../../entities/empleados/empleado.entity';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { CreateEmpleadoInput } from '../../dtos/empleado/create-empleado.input';

@Resolver(() => Empleado)
export class EmpleadoResolver {
    constructor(private readonly empleadoService: EmpleadoService) {}

    @Query(() => [Empleado], { name: 'empleados' })
    findAll() {
        return this.empleadoService.findAll();
    }

    @Mutation(() => Empleado)
    createEmpleado(@Args('createEmpleadoInput') createEmpleadoInput: CreateEmpleadoInput) {
        return this.empleadoService.create(createEmpleadoInput);
    }
}