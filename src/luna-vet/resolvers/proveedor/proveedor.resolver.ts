import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Proveedor } from '../../entities/proveedores/proveedor.entity';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { CreateProveedorInput } from '../../dtos/proveedor/create-proveedor.input';

@Resolver(() => Proveedor)
export class ProveedorResolver {
    constructor(private readonly srv: ProveedorService) {}
    @Query(() => [Proveedor], { name: 'proveedores' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => Proveedor) createProveedor(@Args('createInput') input: CreateProveedorInput) { return this.srv.create(input); }
}