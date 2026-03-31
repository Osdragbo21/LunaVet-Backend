import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Empleado } from '../../entities/empleados/empleado.entity';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { CreateEmpleadoInput } from '../../dtos/empleado/create-empleado.input';
import { RegisterEmpleadoInput } from '../../dtos/empleado/register-empleado.input';

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

  // NUEVA MUTACIÓN: Crea Usuario y Empleado simultáneamente
  @Mutation(() => Empleado)
  registerNewEmpleado(@Args('input') input: RegisterEmpleadoInput) {
    return this.empleadoService.registerNewEmpleado(input);
  }
}