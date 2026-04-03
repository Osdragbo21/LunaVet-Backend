import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroVacunacion } from '../../entities/registros-vacunacion/registro-vacunacion.entity';
import { CreateRegistroVacunacionInput } from '../../dtos/registroVacunacion/create-registro-vacunacion.input';

@Injectable()
export class RegistroVacunacionService {
  constructor(
    @InjectRepository(RegistroVacunacion)
    private registroRepository: Repository<RegistroVacunacion>,
  ) {}

  findAll(): Promise<RegistroVacunacion[]> {
    return this.registroRepository.find({ relations: ['paciente', 'vacuna'] });
  }

  // ==========================================
  // NUEVO MÉTODO: Obtener historial por paciente
  // ==========================================
  findByPaciente(paciente_id: number): Promise<RegistroVacunacion[]> {
    return this.registroRepository.find({
      where: { paciente_id },
      relations: ['vacuna'],
      order: { fecha_aplicacion: 'DESC' } // Mostramos la más reciente primero
    });
  }

  async create(createInput: CreateRegistroVacunacionInput): Promise<RegistroVacunacion> {
    const newRecord = this.registroRepository.create(createInput);
    const savedRecord = await this.registroRepository.save(newRecord);
    
    // Retornamos el objeto con la vacuna cargada para que la UI se actualice de inmediato
    return this.registroRepository.findOneOrFail({
      where: { id_registro_vac: savedRecord.id_registro_vac },
      relations: ['vacuna']
    });
  }
}