import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from '../../entities/vacunas/vacuna.entity';
import { CreateVacunaInput } from '../../dtos/vacuna/create-vacuna.input';

@Injectable()
export class VacunaService {
    constructor(
        @InjectRepository(Vacuna)
        private vacunaRepository: Repository<Vacuna>,
    ) {}

    findAll(): Promise<Vacuna[]> {
        return this.vacunaRepository.find();
    }

    create(createInput: CreateVacunaInput): Promise<Vacuna> {
        const newRecord = this.vacunaRepository.create(createInput);
        return this.vacunaRepository.save(newRecord);
    }
}