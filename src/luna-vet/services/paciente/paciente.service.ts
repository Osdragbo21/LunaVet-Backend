import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../../entities/pacientes/paciente.entity';
import { CreatePacienteInput } from '../../dtos/paciente/create-paciente.input';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>,
    ) {}

    findAll(): Promise<Paciente[]> {
        return this.pacienteRepository.find({ relations: ['cliente'] });
    }

    create(createPacienteInput: CreatePacienteInput): Promise<Paciente> {
        const newPaciente = this.pacienteRepository.create(createPacienteInput);
        return this.pacienteRepository.save(newPaciente);
    }
}