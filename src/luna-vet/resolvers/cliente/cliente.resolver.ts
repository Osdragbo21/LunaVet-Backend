import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cliente } from '../../entities/clientes/cliente.entity';
import { ClienteService } from '../../services/cliente/cliente.service';
import { CreateClienteInput } from '../../dtos/cliente/create-cliente.input';

@Resolver(() => Cliente)
export class ClienteResolver {
    constructor(private readonly clienteService: ClienteService) {}

    @Query(() => [Cliente], { name: 'clientes' })
    findAll() {
        return this.clienteService.findAll();
    }

    @Mutation(() => Cliente)
    createCliente(@Args('createClienteInput') createClienteInput: CreateClienteInput) {
        return this.clienteService.create(createClienteInput);
    }
}