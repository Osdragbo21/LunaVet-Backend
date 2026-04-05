import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from '../../entities/servicios/servicio.entity';
import { CreateServicioInput } from '../../dtos/servicio/create-servicio.input';
import { UpdateServicioInput } from '../../dtos/servicio/update-servicio.input';

@Injectable()
export class ServicioService {
  constructor(@InjectRepository(Servicio) private rep: Repository<Servicio>) {}
  
  findAll(): Promise<Servicio[]> { 
    return this.rep.find(); 
  }
  
  create(input: CreateServicioInput): Promise<Servicio> { 
    return this.rep.save(this.rep.create(input)); 
  }

  // ==========================================
  // NUEVO: Actualizar Servicio
  // ==========================================
  async update(id: number, updateInput: UpdateServicioInput): Promise<Servicio> {
    const servicio = await this.rep.preload({
      ...updateInput,
      id_servicio: id,
    } as any);

    if (!servicio) throw new Error(`Servicio con ID ${id} no encontrado`);
    return this.rep.save(servicio);
  }

  // ==========================================
  // NUEVO: Eliminar Servicio
  // ==========================================
  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.rep.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error('No se puede eliminar este servicio porque ya ha sido cobrado en ventas anteriores.');
      }
      throw new Error('Error interno al eliminar el servicio.');
    }
  }
}