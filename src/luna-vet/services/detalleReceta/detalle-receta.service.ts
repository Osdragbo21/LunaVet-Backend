import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleReceta } from '../../entities/detalles-receta/detalle-receta.entity';
import { CreateDetalleRecetaInput } from '../../dtos/detalleReceta/create-detalle-receta.input';

@Injectable()
export class DetalleRecetaService {
    constructor(
        @InjectRepository(DetalleReceta)
        private detalleRepository: Repository<DetalleReceta>,
    ) {}

    findAll(): Promise<DetalleReceta[]> {
        return this.detalleRepository.find({ relations: ['receta', 'medicamento'] });
    }

    create(createInput: CreateDetalleRecetaInput): Promise<DetalleReceta> {
        const newRecord = this.detalleRepository.create(createInput);
        return this.detalleRepository.save(newRecord);
    }
}