import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitalizacion } from '../../entities/hospitalizaciones/hospitalizacion.entity';
import { CreateHospitalizacionInput } from '../../dtos/hospitalizacion/create-hospitalizacion.input';
import { UpdateHospitalizacionInput } from '../../dtos/hospitalizacion/update-hospitalizacion.input';

@Injectable()
export class HospitalizacionService {
  constructor(
    @InjectRepository(Hospitalizacion)
    private hospitalizacionRepository: Repository<Hospitalizacion>,
  ) {}

  // ACTUALIZADO: Trae el paciente y el dueño (cliente) anidado
  findAll(): Promise<Hospitalizacion[]> {
    return this.hospitalizacionRepository.find({ 
      relations: ['paciente', 'paciente.cliente', 'empleado'],
      order: { fecha_ingreso: 'DESC' }
    });
  }

  create(createInput: CreateHospitalizacionInput): Promise<Hospitalizacion> {
    const newRecord = this.hospitalizacionRepository.create(createInput);
    return this.hospitalizacionRepository.save(newRecord);
  }

  // NUEVO: Actualizar estado y fecha de alta de un paciente internado
  async update(id: number, updateInput: UpdateHospitalizacionInput): Promise<Hospitalizacion> {
    const hospitalizacion = await this.hospitalizacionRepository.preload({
      ...updateInput,
      id_hospitalizacion: id,
    } as any);

    if (!hospitalizacion) {
      throw new Error(`Hospitalización con ID ${id} no encontrada`);
    }

    const actualizada = await this.hospitalizacionRepository.save(hospitalizacion);

    return this.hospitalizacionRepository.findOneOrFail({
      where: { id_hospitalizacion: actualizada.id_hospitalizacion },
      relations: ['paciente', 'paciente.cliente', 'empleado']
    });
  }
}