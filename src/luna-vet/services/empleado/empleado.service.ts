import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../../entities/empleados/empleado.entity';
import { CreateEmpleadoInput } from '../../dtos/empleado/create-empleado.input';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepository: Repository<Empleado>,
    ) {}

    findAll(): Promise<Empleado[]> {
        return this.empleadoRepository.find({ relations: ['usuario', 'especialidades'] });
    }

    create(createEmpleadoInput: CreateEmpleadoInput): Promise<Empleado> {
        const newEmpleado = this.empleadoRepository.create(createEmpleadoInput);
        return this.empleadoRepository.save(newEmpleado);
    }
}