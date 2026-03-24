import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeterinarioEspecialidad } from '../../entities/veterinarios-especialidades/veterinario-especialidad.entity';
import { CreateVeterinarioEspecialidadInput } from '../../dtos/veterinarioEspecialidad/create-veterinario-especialidad.input';

@Injectable()
export class VeterinarioEspecialidadService {
    constructor(
        @InjectRepository(VeterinarioEspecialidad)
        private vetEspRepository: Repository<VeterinarioEspecialidad>,
    ) {}

    findAll(): Promise<VeterinarioEspecialidad[]> {
        return this.vetEspRepository.find({ relations: ['empleado'] });
    }

    create(createInput: CreateVeterinarioEspecialidadInput): Promise<VeterinarioEspecialidad> {
        const newEsp = this.vetEspRepository.create(createInput);
        return this.vetEspRepository.save(newEsp);
    }
}