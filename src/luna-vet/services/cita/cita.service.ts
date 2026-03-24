import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../../entities/citas/cita.entity';
import { CreateCitaInput } from '../../dtos/cita/create-cita.input';

@Injectable()
export class CitaService {
    constructor(
        @InjectRepository(Cita)
        private citaRepository: Repository<Cita>,
    ) {}

    findAll(): Promise<Cita[]> {
        return this.citaRepository.find({ relations: ['paciente', 'empleado', 'consulta'] });
    }

    create(createCitaInput: CreateCitaInput): Promise<Cita> {
        const newCita = this.citaRepository.create(createCitaInput);
        return this.citaRepository.save(newCita);
    }
}