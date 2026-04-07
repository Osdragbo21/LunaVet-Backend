import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cliente } from '../../entities/clientes/cliente.entity';
import { ClienteService } from '../../services/cliente/cliente.service';
import { CreateClienteInput } from '../../dtos/cliente/create-cliente.input';
import { UpdateClienteInput } from '../../dtos/cliente/update-cliente.input';
import { RegisterClienteInput } from '../../dtos/cliente/register-cliente.input';

@Resolver(() => Cliente)
export class ClienteResolver {
  constructor(private readonly clienteService: ClienteService) {}

  @Query(() => [Cliente], { name: 'clientes' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Mutation(() => Cliente)
  createCliente(@Args('createInput') createInput: CreateClienteInput) {
    return this.clienteService.create(createInput);
  }

  @Mutation(() => Cliente)
  updateCliente(@Args('updateClienteInput') updateInput: UpdateClienteInput) {
    return this.clienteService.update(updateInput.id_cliente, updateInput);
  }

  // =========================================================
  // RESTAURADO: Mutación para crear cuenta de Cliente web
  // =========================================================
  @Mutation(() => Cliente)
  registerNewCliente(@Args('input') input: RegisterClienteInput) {
    return this.clienteService.registerNewCliente(input);
  }
}