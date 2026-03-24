import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from '../../entities/recetas/receta.entity';
import { CreateRecetaInput } from '../../dtos/receta/create-receta.input';

@Injectable()
export class RecetaService {
    constructor(
        @InjectRepository(Receta)
        private recetaRepository: Repository<Receta>,
    ) {}

    findAll(): Promise<Receta[]> {
        return this.recetaRepository.find({ relations: ['consulta'] });
    }

    create(createInput: CreateRecetaInput): Promise<Receta> {
        const newRecord = this.recetaRepository.create(createInput);
        return this.recetaRepository.save(newRecord);
    }
}