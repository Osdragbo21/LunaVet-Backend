import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../../entities/pacientes/paciente.entity';
import { CreatePacienteInput } from '../../dtos/paciente/create-paciente.input';
import { UpdatePacienteInput } from '../../dtos/paciente/update-paciente.input';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente) 
        private readonly rep: Repository<Paciente>,
    ) {}

    // Consulta todos los pacientes e incluye la relación con su dueño (Cliente)
    findAll(): Promise<Paciente[]> { 
        return this.rep.find({ relations: ['cliente'] }); 
    }

    // Crea un paciente y retorna el objeto completo con la relación resuelta
    async create(input: CreatePacienteInput): Promise<Paciente> {
        // 1. Creamos la instancia y la guardamos en la base de datos
        const nuevoPaciente = this.rep.create(input);
        const pacienteGuardado = await this.rep.save(nuevoPaciente);

        // 2. Usamos findOneOrFail para asegurar que no retorna null y complacer a TypeScript
        return this.rep.findOneOrFail({
        where: { id_paciente: pacienteGuardado.id_paciente },
        relations: ['cliente']
        });
    }

    // Actualiza un paciente existente y retorna el objeto actualizado con su relación
    async update(id: number, updateInput: UpdatePacienteInput): Promise<Paciente> {
        // Al esparcir (...updateInput), TypeScript a veces entra en conflicto con DeepPartial de TypeORM.
        // Invertir el orden y usar "as any" elimina esa falsa alerta roja en el IDE.
        const paciente = await this.rep.preload({
        ...updateInput,
        id_paciente: id,
        } as any);

        if (!paciente) {
        throw new Error(`Paciente con ID ${id} no encontrado`);
        }

        const pacienteActualizado = await this.rep.save(paciente);

        // Retornamos el paciente actualizado con el join del cliente usando findOneOrFail
        return this.rep.findOneOrFail({
        where: { id_paciente: pacienteActualizado.id_paciente },
        relations: ['cliente']
        });
    }

    // Elimina un paciente por su ID y retorna true si afectó alguna fila
    async remove(id: number): Promise<boolean> {
        const result = await this.rep.delete(id);
        return (result.affected ?? 0) > 0;
    }
}