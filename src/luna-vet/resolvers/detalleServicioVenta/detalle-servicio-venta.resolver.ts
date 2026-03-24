import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DetalleServicioVenta } from '../../entities/detalles-servicios-venta/detalle-servicio-venta.entity';
import { DetalleServicioVentaService } from '../../services/detalleServicioVenta/detalle-servicio-venta.service';
import { CreateDetalleServicioVentaInput } from '../../dtos/detalleServicioVenta/create-detalle-servicio-venta.input';

@Resolver(() => DetalleServicioVenta)
export class DetalleServicioVentaResolver {
    constructor(private readonly srv: DetalleServicioVentaService) {}
    @Query(() => [DetalleServicioVenta], { name: 'detallesServicioVenta' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => DetalleServicioVenta) createDetalleServicioVenta(@Args('createInput') input: CreateDetalleServicioVentaInput) { return this.srv.create(input); }
}