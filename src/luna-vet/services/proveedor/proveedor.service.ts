import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../../entities/proveedores/proveedor.entity';
import { CreateProveedorInput } from '../../dtos/proveedor/create-proveedor.input';
import { UpdateProveedorInput } from '../../dtos/proveedor/update-proveedor.input';

@Injectable()
export class ProveedorService {
  constructor(@InjectRepository(Proveedor) private rep: Repository<Proveedor>) {}
  
  findAll(): Promise<Proveedor[]> { 
    return this.rep.find(); 
  }
  
  create(input: CreateProveedorInput): Promise<Proveedor> { 
    return this.rep.save(this.rep.create(input)); 
  }

  // MÉTODO: Actualizar información de contacto
  async update(id: number, input: UpdateProveedorInput): Promise<Proveedor> {
    const proveedor = await this.rep.preload({
      ...input,
      id_proveedor: id,
    } as any);

    if (!proveedor) {
      throw new Error(`Proveedor con ID ${id} no encontrado`);
    }

    return this.rep.save(proveedor);
  }

  // MÉTODO: Eliminar proveedor y proteger llaves foráneas
  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.rep.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: any) {
      // Capturamos la violación de llave foránea (código 23503 en Postgres)
      if (error.code === '23503') {
        throw new Error('No se puede eliminar este proveedor porque tiene productos asignados en el inventario.');
      }
      throw new Error('Error interno al intentar eliminar el proveedor.');
    }
  }
}