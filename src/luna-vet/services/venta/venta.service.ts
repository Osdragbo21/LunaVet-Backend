import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from '../../entities/ventas/venta.entity';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';
import { UpdateVentaInput } from '../../dtos/venta/update-venta.input';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private rep: Repository<Venta>,
    private dataSource: DataSource 
  ) {}

  // =========================================================
  // MÉTODO PARA EL HISTORIAL DE VENTAS
  // Trae: cliente, cajero(empleado), los renglones(detalles) 
  // y el nombre del articulo (detalles.producto)
  // =========================================================
  findAll(): Promise<Venta[]> { 
    return this.rep.find({ 
      relations: [
        'cliente', 
        'empleado', 
        'detalles', 
        'detalles.producto'
      ],
      order: { fecha_venta: 'DESC' }
    }); 
  }

  // =========================================================
  // MÉTODO TRANSACCIONAL: Crear Venta POS
  // =========================================================
  async create(input: CreateVentaInput): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nuevaVenta = queryRunner.manager.create(Venta, {
        cliente_id: input.cliente_id,
        empleado_id: input.empleado_id,
        total: input.total,
        metodo_pago: input.metodo_pago,
        tipo_venta: input.tipo_venta || 'Fisica',
        estado_pedido: input.estado_pedido || 'Completado'
      });
      const ventaGuardada = await queryRunner.manager.save(nuevaVenta);

      for (const detalle of input.detalles) {
        const producto = await queryRunner.manager.findOne(Producto, { where: { id_producto: detalle.producto_id } });
        
        if (!producto) {
          throw new Error(`El producto con ID ${detalle.producto_id} no existe.`);
        }
        if (producto.stock_actual < detalle.cantidad) {
          throw new Error(`Stock insuficiente para el producto: ${producto.nombre}. Quedan ${producto.stock_actual} unidades.`);
        }

        producto.stock_actual -= detalle.cantidad;
        await queryRunner.manager.save(producto); 

        const nuevoDetalle = queryRunner.manager.create(DetalleVenta, {
          venta_id: ventaGuardada.id_venta,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.cantidad * detalle.precio_unitario
        });
        await queryRunner.manager.save(nuevoDetalle);
      }

      await queryRunner.commitTransaction();

      return this.rep.findOneOrFail({ 
        where: { id_venta: ventaGuardada.id_venta },
        relations: ['cliente', 'empleado', 'detalles', 'detalles.producto']
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // =========================================================
  // MÉTODO: Actualizar Venta (Correcciones administrativas)
  // =========================================================
  async update(id: number, updateInput: UpdateVentaInput): Promise<Venta> {
    const venta = await this.rep.preload({
      ...updateInput,
      id_venta: id,
    } as any);

    if (!venta) {
      throw new Error(`Venta con ID ${id} no encontrada`);
    }

    const ventaActualizada = await this.rep.save(venta);

    return this.rep.findOneOrFail({
      where: { id_venta: ventaActualizada.id_venta },
      relations: ['cliente', 'empleado', 'detalles', 'detalles.producto']
    });
  }
}