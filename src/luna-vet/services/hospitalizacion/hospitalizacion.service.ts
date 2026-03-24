import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitalizacion } from '../../entities/hospitalizaciones/hospitalizacion.entity';
import { CreateHospitalizacionInput } from '../../dtos/hospitalizacion/create-hospitalizacion.input';

@Injectable()
export class HospitalizacionService {
    constructor(
        @InjectRepository(Hospitalizacion)
        private hospitalizacionRepository: Repository<Hospitalizacion>,
    ) {}

    findAll(): Promise<Hospitalizacion[]> {
        return this.hospitalizacionRepository.find({ relations: ['paciente', 'empleado'] });
    }

    create(createInput: CreateHospitalizacionInput): Promise<Hospitalizacion> {
        const newRecord = this.hospitalizacionRepository.create(createInput);
        return this.hospitalizacionRepository.save(newRecord);
    }
}