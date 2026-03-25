import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Paciente } from '../../entities/pacientes/paciente.entity';
import { PacienteService } from '../../services/paciente/paciente.service';
import { CreatePacienteInput } from '../../dtos/paciente/create-paciente.input';
import { UpdatePacienteInput } from '../../dtos/paciente/update-paciente.input';

@Resolver(() => Paciente)
export class PacienteResolver {
    constructor(private readonly pacienteService: PacienteService) {}

    @Query(() => [Paciente], { name: 'pacientes' })
    findAll() {
        return this.pacienteService.findAll();
    }

    @Mutation(() => Paciente)
    createPaciente(@Args('createPacienteInput') createPacienteInput: CreatePacienteInput) {
        return this.pacienteService.create(createPacienteInput);
    }

    @Mutation(() => Paciente)
    updatePaciente(@Args('updatePacienteInput') updatePacienteInput: UpdatePacienteInput) {
        return this.pacienteService.update(updatePacienteInput.id_paciente, updatePacienteInput);
    }

    @Mutation(() => Boolean)
    removePaciente(@Args('id', { type: () => Int }) id: number) {
        return this.pacienteService.remove(id);
    }
}