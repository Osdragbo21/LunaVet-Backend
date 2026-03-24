import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Venta } from '../../entities/ventas/venta.entity';
import { VentaService } from '../../services/venta/venta.service';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';

@Resolver(() => Venta)
export class VentaResolver {
    constructor(private readonly srv: VentaService) {}
    @Query(() => [Venta], { name: 'ventas' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => Venta) createVenta(@Args('createInput') input: CreateVentaInput) { return this.srv.create(input); }
}