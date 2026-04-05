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

  // =================================================================
  // NUEVO MÉTODO: Consulta un paciente por ID con TODO su expediente
  // =================================================================
  findOne(id: number): Promise<Paciente> {
    return this.rep.findOneOrFail({
      where: { id_paciente: id },
      relations: [
        'cliente', 
        'citas', 
        'citas.consulta', 
        'citas.consulta.archivos',
        'hospitalizaciones'
      ]
    });
  }

  // Crea un paciente y retorna el objeto completo con la relación resuelta
  async create(input: CreatePacienteInput): Promise<Paciente> {
    const nuevoPaciente = this.rep.create(input);
    const pacienteGuardado = await this.rep.save(nuevoPaciente);

    return this.rep.findOneOrFail({
      where: { id_paciente: pacienteGuardado.id_paciente },
      relations: ['cliente']
    });
  }

  // Actualiza un paciente existente y retorna el objeto actualizado
  async update(id: number, updateInput: UpdatePacienteInput): Promise<Paciente> {
    const paciente = await this.rep.preload({
      ...updateInput,
      id_paciente: id,
    } as any);

    if (!paciente) {
      throw new Error(`Paciente con ID ${id} no encontrado`);
    }

    const pacienteActualizado = await this.rep.save(paciente);

    return this.rep.findOneOrFail({
      where: { id_paciente: pacienteActualizado.id_paciente },
      relations: ['cliente']
    });
  }

  // Elimina un paciente por su ID
  async remove(id: number): Promise<boolean> {
    const result = await this.rep.delete(id);
    return (result.affected ?? 0) > 0;
  }
}