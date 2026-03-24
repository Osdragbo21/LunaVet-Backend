import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { DetalleVentaService } from '../../services/detalleVenta/detalle-venta.service';
import { CreateDetalleVentaInput } from '../../dtos/detalleVenta/create-detalle-venta.input';

@Resolver(() => DetalleVenta)
export class DetalleVentaResolver {
    constructor(private readonly srv: DetalleVentaService) {}
    @Query(() => [DetalleVenta], { name: 'detallesVenta' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => DetalleVenta) createDetalleVenta(@Args('createInput') input: CreateDetalleVentaInput) { return this.srv.create(input); }
}