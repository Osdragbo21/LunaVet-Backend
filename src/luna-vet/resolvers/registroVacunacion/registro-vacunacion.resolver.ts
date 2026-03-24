import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegistroVacunacion } from '../../entities/registros-vacunacion/registro-vacunacion.entity';
import { RegistroVacunacionService } from '../../services/registroVacunacion/registro-vacunacion.service';
import { CreateRegistroVacunacionInput } from '../../dtos/registroVacunacion/create-registro-vacunacion.input';

@Resolver(() => RegistroVacunacion)
export class RegistroVacunacionResolver {
    constructor(private readonly registroService: RegistroVacunacionService) {}

    @Query(() => [RegistroVacunacion], { name: 'registrosVacunacion' })
    findAll() {
        return this.registroService.findAll();
    }

    @Mutation(() => RegistroVacunacion)
    createRegistroVacunacion(@Args('createInput') createInput: CreateRegistroVacunacionInput) {
        return this.registroService.create(createInput);
    }
}