import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MovimientoInventario } from '../../entities/movimientos-inventario/movimiento-inventario.entity';
import { MovimientoInventarioService } from '../../services/movimientoInventario/movimiento-inventario.service';
import { CreateMovimientoInventarioInput } from '../../dtos/movimientoInventario/create-movimiento-inventario.input';

@Resolver(() => MovimientoInventario)
export class MovimientoInventarioResolver {
    constructor(private readonly srv: MovimientoInventarioService) {}
    @Query(() => [MovimientoInventario], { name: 'movimientosInventario' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => MovimientoInventario) createMovimientoInventario(@Args('createInput') input: CreateMovimientoInventarioInput) { return this.srv.create(input); }
}