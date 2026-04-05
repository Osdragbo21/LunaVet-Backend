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
    private pacienteRepository: Repository<Paciente>,
  ) {}

  findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find({ relations: ['cliente'] });
  }

  findOne(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOneOrFail({
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

  create(createInput: CreatePacienteInput): Promise<Paciente> {
    const newRecord = this.pacienteRepository.create(createInput);
    return this.pacienteRepository.save(newRecord);
  }

  // =========================================================
  // FIX: Usar preload() y save() en lugar de update() para
  // garantizar que el Suscriptor de Auditoría detecte el evento
  // =========================================================
  async update(id: number, updateInput: UpdatePacienteInput): Promise<Paciente> {
    const paciente = await this.pacienteRepository.preload({
      ...updateInput,
      id_paciente: id,
    } as any);

    if (!paciente) {
      throw new Error(`Paciente con ID ${id} no encontrado`);
    }

    // Al usar save(), TypeORM dispara el evento afterUpdate en el Subscriber
    const pacienteActualizado = await this.pacienteRepository.save(paciente);

    return this.pacienteRepository.findOneOrFail({
      where: { id_paciente: pacienteActualizado.id_paciente },
      relations: ['cliente']
    });
  }

  // =========================================================
  // FIX: Usar remove() en lugar de delete() para disparar
  // el evento afterRemove en el Subscriber
  // =========================================================
  async remove(id: number): Promise<boolean> {
    const paciente = await this.pacienteRepository.findOne({ where: { id_paciente: id } as any });
    if (!paciente) return false;
    
    // remove() dispara los triggers, a diferencia de delete()
    await this.pacienteRepository.remove(paciente);
    return true;
  }
}