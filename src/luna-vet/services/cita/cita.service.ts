import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../../entities/citas/cita.entity';
import { CreateCitaInput } from '../../dtos/cita/create-cita.input';

@Injectable()
export class CitaService {
    constructor(
        @InjectRepository(Cita)
        private readonly citaRepo: Repository<Cita>,
    ) {}

    // 1. Obtener todas con relaciones anidadas (Paciente -> Cliente)
    findAll(): Promise<Cita[]> {
        return this.citaRepo.find({
        relations: ['paciente', 'paciente.cliente', 'empleado'],
        order: { fecha_hora: 'ASC' }
        });
    }

    // 2. Crear nueva cita
    async create(input: CreateCitaInput): Promise<Cita> {
        const nuevaCita = this.citaRepo.create(input);
        return this.citaRepo.save(nuevaCita);
    }

    // 3. Actualizar solo el estado
    async updateEstado(id: number, nuevoEstado: string): Promise<Cita> {
        const cita = await this.citaRepo.findOneOrFail({ where: { id_cita: id } });
        cita.estado = nuevoEstado;
        return this.citaRepo.save(cita);
    }
}