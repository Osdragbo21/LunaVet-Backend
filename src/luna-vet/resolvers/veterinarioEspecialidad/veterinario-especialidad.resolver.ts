import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VeterinarioEspecialidad } from '../../entities/veterinarios-especialidades/veterinario-especialidad.entity';
import { VeterinarioEspecialidadService } from '../../services/veterinarioEspecialidad/veterinario-especialidad.service';
import { CreateVeterinarioEspecialidadInput } from '../../dtos/veterinarioEspecialidad/create-veterinario-especialidad.input';

@Resolver(() => VeterinarioEspecialidad)
export class VeterinarioEspecialidadResolver {
    constructor(private readonly vetEspService: VeterinarioEspecialidadService) {}

    @Query(() => [VeterinarioEspecialidad], { name: 'veterinarioEspecialidades' })
    findAll() {
        return this.vetEspService.findAll();
    }

    @Mutation(() => VeterinarioEspecialidad)
    createVeterinarioEspecialidad(@Args('createInput') createInput: CreateVeterinarioEspecialidadInput) {
        return this.vetEspService.create(createInput);
    }
}