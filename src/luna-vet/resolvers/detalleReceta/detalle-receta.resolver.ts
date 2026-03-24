import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DetalleReceta } from '../../entities/detalles-receta/detalle-receta.entity';
import { DetalleRecetaService } from '../../services/detalleReceta/detalle-receta.service';
import { CreateDetalleRecetaInput } from '../../dtos/detalleReceta/create-detalle-receta.input';

@Resolver(() => DetalleReceta)
export class DetalleRecetaResolver {
    constructor(private readonly detalleService: DetalleRecetaService) {}

    @Query(() => [DetalleReceta], { name: 'detallesReceta' })
    findAll() {
        return this.detalleService.findAll();
    }

    @Mutation(() => DetalleReceta)
    createDetalleReceta(@Args('createInput') createInput: CreateDetalleRecetaInput) {
        return this.detalleService.create(createInput);
    }
}