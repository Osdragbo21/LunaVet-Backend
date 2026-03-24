import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroVacunacion } from '../../entities/registros-vacunacion/registro-vacunacion.entity';
import { CreateRegistroVacunacionInput } from '../../dtos/registroVacunacion/create-registro-vacunacion.input';

@Injectable()
export class RegistroVacunacionService {
    constructor(
        @InjectRepository(RegistroVacunacion)
        private registroRepository: Repository<RegistroVacunacion>,
    ) {}

    findAll(): Promise<RegistroVacunacion[]> {
        return this.registroRepository.find({ relations: ['paciente', 'vacuna'] });
    }

    create(createInput: CreateRegistroVacunacionInput): Promise<RegistroVacunacion> {
        const newRecord = this.registroRepository.create(createInput);
        return this.registroRepository.save(newRecord);
    }
}