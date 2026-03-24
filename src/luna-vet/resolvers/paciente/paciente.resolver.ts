import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Paciente } from '../../entities/pacientes/paciente.entity';
import { PacienteService } from '../../services/paciente/paciente.service';
import { CreatePacienteInput } from '../../dtos/paciente/create-paciente.input';

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
}