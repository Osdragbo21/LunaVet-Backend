import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Receta } from '../../entities/recetas/receta.entity';
import { RecetaService } from '../../services/receta/receta.service';
import { CreateRecetaInput } from '../../dtos/receta/create-receta.input';

@Resolver(() => Receta)
export class RecetaResolver {
    constructor(private readonly recetaService: RecetaService) {}

    @Query(() => [Receta], { name: 'recetas' })
    findAll() {
        return this.recetaService.findAll();
    }

    @Mutation(() => Receta)
    createReceta(@Args('createInput') createInput: CreateRecetaInput) {
        return this.recetaService.create(createInput);
    }
}