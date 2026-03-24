import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from '../../entities/consultas/consulta.entity';
import { CreateConsultaInput } from '../../dtos/consulta/create-consulta.input';

@Injectable()
export class ConsultaService {
    constructor(
        @InjectRepository(Consulta)
        private consultaRepository: Repository<Consulta>,
    ) {}

    findAll(): Promise<Consulta[]> {
        return this.consultaRepository.find({ relations: ['cita', 'archivos'] });
    }

    create(createConsultaInput: CreateConsultaInput): Promise<Consulta> {
        const newConsulta = this.consultaRepository.create(createConsultaInput);
        return this.consultaRepository.save(newConsulta);
    }
}