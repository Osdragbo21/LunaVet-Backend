import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../../entities/medicamentos/medicamento.entity';
import { CreateMedicamentoInput } from '../../dtos/medicamento/create-medicamento.input';

@Injectable()
export class MedicamentoService {
    constructor(
        @InjectRepository(Medicamento)
        private medicamentoRepository: Repository<Medicamento>,
    ) {}

    findAll(): Promise<Medicamento[]> {
        return this.medicamentoRepository.find();
    }

    create(createInput: CreateMedicamentoInput): Promise<Medicamento> {
        const newRecord = this.medicamentoRepository.create(createInput);
        return this.medicamentoRepository.save(newRecord);
    }
}