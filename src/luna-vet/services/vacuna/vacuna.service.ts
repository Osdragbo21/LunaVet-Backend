import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from '../../entities/vacunas/vacuna.entity';
import { CreateVacunaInput } from '../../dtos/vacuna/create-vacuna.input';
import { UpdateVacunaInput } from '../../dtos/vacuna/update-vacuna.input';

@Injectable()
export class VacunaService {
  constructor(
    @InjectRepository(Vacuna)
    private vacunaRepository: Repository<Vacuna>,
  ) {}

  findAll(): Promise<Vacuna[]> {
    return this.vacunaRepository.find();
  }

  create(createInput: CreateVacunaInput): Promise<Vacuna> {
    const newRecord = this.vacunaRepository.create(createInput);
    return this.vacunaRepository.save(newRecord);
  }

  // ==========================================
  // NUEVO: Actualizar Vacuna
  // ==========================================
  async update(id: number, updateInput: UpdateVacunaInput): Promise<Vacuna> {
    const vacuna = await this.vacunaRepository.preload({
      ...updateInput,
      id_vacuna: id,
    } as any);

    if (!vacuna) {
      throw new Error(`Vacuna con ID ${id} no encontrada`);
    }

    return this.vacunaRepository.save(vacuna);
  }

  // ==========================================
  // NUEVO: Eliminar Vacuna (Protegido)
  // ==========================================
  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.vacunaRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: any) {
      // Código 23503: Violación de llave foránea en PostgreSQL
      if (error.code === '23503') {
        throw new Error('No se puede eliminar esta vacuna porque ya tiene aplicaciones registradas en la cartilla de pacientes.');
      }
      throw new Error('Error interno al intentar eliminar la vacuna.');
    }
  }
}