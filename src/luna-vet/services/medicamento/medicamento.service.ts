import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../../entities/medicamentos/medicamento.entity';
import { CreateMedicamentoInput } from '../../dtos/medicamento/create-medicamento.input';
import { UpdateMedicamentoInput } from '../../dtos/medicamento/update-medicamento.input';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
  ) {}

  findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find();
  }

  create(createInput: CreateMedicamentoInput): Promise<Medicamento> {
    const newRecord = this.medicamentoRepository.create(createInput);
    return this.medicamentoRepository.save(newRecord);
  }

  // ==========================================
  // NUEVO: Actualizar Medicamento
  // ==========================================
  async update(id: number, updateInput: UpdateMedicamentoInput): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.preload({
      ...updateInput,
      id_medicamento: id,
    } as any);

    if (!medicamento) {
      throw new Error(`Medicamento con ID ${id} no encontrado`);
    }

    return this.medicamentoRepository.save(medicamento);
  }

  // ==========================================
  // NUEVO: Eliminar Medicamento (Protegido)
  // ==========================================
  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.medicamentoRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: any) {
      // Capturamos la violación de llave foránea (23503) por si ya fue recetado
      if (error.code === '23503') {
        throw new Error('No se puede eliminar este medicamento porque ya está asignado a recetas médicas.');
      }
      throw new Error('Error interno al intentar eliminar el medicamento.');
    }
  }
}