import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchivoConsulta } from '../../entities/archivos-consulta/archivo-consulta.entity';
import { CreateArchivoConsultaInput } from '../../dtos/archivoConsulta/create-archivo-consulta.input';

@Injectable()
export class ArchivoConsultaService {
    constructor(
        @InjectRepository(ArchivoConsulta)
        private archivoRepository: Repository<ArchivoConsulta>,
    ) {}

    findAll(): Promise<ArchivoConsulta[]> {
        return this.archivoRepository.find({ relations: ['consulta'] });
    }

    create(createInput: CreateArchivoConsultaInput): Promise<ArchivoConsulta> {
        const newArchivo = this.archivoRepository.create(createInput);
        return this.archivoRepository.save(newArchivo);
    }
}