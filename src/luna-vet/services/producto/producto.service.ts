import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateProductoInput } from '../../dtos/producto/create-producto.input';
import { UpdateProductoInput } from '../../dtos/producto/update-producto.input';
import { DataSource } from 'typeorm';
import { MovimientoInventario } from '../../entities/movimientos-inventario/movimiento-inventario.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto) private rep: Repository<Producto>,
    private dataSource: DataSource // Inyectamos DataSource para las transacciones del Kardex
  ) {}
  
  findAll(): Promise<Producto[]> { 
    return this.rep.find({ relations: ['proveedor'] }); 
  }
  
  create(input: CreateProductoInput): Promise<Producto> { 
    return this.rep.save(this.rep.create(input)); 
  }

  // MÉTODO: Actualizar producto (precios, stock, imágenes, etc.)
  async update(id: number, updateInput: UpdateProductoInput): Promise<Producto> {
    // 1. Obtenemos el producto original ANTES de actualizar para comparar el stock
    const productoOriginal = await this.rep.findOne({ where: { id_producto: id } });
    if (!productoOriginal) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    const producto = await this.rep.preload({
      ...updateInput,
      id_producto: id,
    } as any);

    // ====================================================================
    // FIX TYPESCRIPT: Le garantizamos al compilador que el producto existe
    // ====================================================================
    if (!producto) {
      throw new Error(`Error al precargar el producto con ID ${id}`);
    }

    // 2. Iniciamos una transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Guardamos el producto modificado. Gracias al "if" de arriba, 
      // TS ahora sabe que "productoActualizado" nunca será undefined.
      const productoActualizado = await queryRunner.manager.save(producto);

      // 3. Verificamos si hubo un cambio manual en el stock
      if (updateInput.stock_actual !== undefined && updateInput.stock_actual !== productoOriginal.stock_actual) {
        const diferenciaStock = updateInput.stock_actual - productoOriginal.stock_actual;
        
        const nuevoMovimiento = queryRunner.manager.create(MovimientoInventario, {
          producto_id: id,
          empleado_id: 1, // Fallback (Idealmente vendría del JWT de sesión)
          tipo_movimiento: diferenciaStock > 0 ? 'Entrada' : 'Salida',
          cantidad: Math.abs(diferenciaStock),
          motivo: 'Ajuste manual de inventario desde Catálogo'
        });
        await queryRunner.manager.save(nuevoMovimiento);
      }

      await queryRunner.commitTransaction();

      return this.rep.findOneOrFail({
        where: { id_producto: productoActualizado.id_producto },
        relations: ['proveedor']
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // =========================================================
  // NUEVO MÉTODO: Eliminar producto por su ID
  // =========================================================
  async remove(id: number): Promise<boolean> {
    const result = await this.rep.delete(id);
    return (result.affected ?? 0) > 0;
  }
}