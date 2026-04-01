import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateProductoInput } from '../../dtos/producto/create-producto.input';
import { UpdateProductoInput } from '../../dtos/producto/update-producto.input';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private rep: Repository<Producto>) {}
  
  findAll(): Promise<Producto[]> { 
    return this.rep.find({ relations: ['proveedor'] }); 
  }
  
  create(input: CreateProductoInput): Promise<Producto> { 
    return this.rep.save(this.rep.create(input)); 
  }

  // NUEVO MÉTODO: Actualizar producto (precios, stock, imágenes, etc.)
  async update(id: number, updateInput: UpdateProductoInput): Promise<Producto> {
    const producto = await this.rep.preload({
      ...updateInput,
      id_producto: id,
    } as any);

    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    const productoActualizado = await this.rep.save(producto);

    return this.rep.findOneOrFail({
      where: { id_producto: productoActualizado.id_producto },
      relations: ['proveedor']
    });
  }
}