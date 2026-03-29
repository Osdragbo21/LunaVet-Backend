import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Cita } from '../../entities/citas/cita.entity';
import { CitaService } from '../../services/cita/cita.service';
import { CreateCitaInput } from '../../dtos/cita/create-cita.input';

@Resolver(() => Cita)
export class CitaResolver {
    constructor(private readonly citaService: CitaService) {}

    @Query(() => [Cita], { name: 'citas' })
    findAll() {
        return this.citaService.findAll();
    }

    @Mutation(() => Cita)
    createCita(@Args('createCitaInput') createCitaInput: CreateCitaInput) {
        return this.citaService.create(createCitaInput);
    }

    @Mutation(() => Cita)
    updateEstadoCita(
        @Args('id', { type: () => Int }) id: number,
        @Args('nuevoEstado') nuevoEstado: string,
    ) {
        return this.citaService.updateEstado(id, nuevoEstado);
    }
}