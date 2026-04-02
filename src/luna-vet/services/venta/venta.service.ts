import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from '../../entities/ventas/venta.entity';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private rep: Repository<Venta>,
    private dataSource: DataSource // Inyectamos el DataSource para Transacciones
  ) {}

  findAll(): Promise<Venta[]> { 
    return this.rep.find({ relations: ['cliente', 'empleado', 'detalles', 'detalles.producto'] }); 
  }

  // MÉTODO TRANSACCIONAL: Crear Venta POS
  async create(input: CreateVentaInput): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // Iniciamos la transacción segura

    try {
      // 1. Crear la cabecera de la Venta
      const nuevaVenta = queryRunner.manager.create(Venta, {
        cliente_id: input.cliente_id,
        empleado_id: input.empleado_id,
        total: input.total,
        metodo_pago: input.metodo_pago,
        tipo_venta: input.tipo_venta || 'Fisica',
        estado_pedido: input.estado_pedido || 'Completado'
      });
      const ventaGuardada = await queryRunner.manager.save(nuevaVenta);

      // 2. Procesar el carrito (Detalles) y descontar Inventario
      for (const detalle of input.detalles) {
        
        // A) Validar y Descontar Stock
        const producto = await queryRunner.manager.findOne(Producto, { where: { id_producto: detalle.producto_id } });
        
        if (!producto) {
          throw new Error(`El producto con ID ${detalle.producto_id} no existe.`);
        }
        if (producto.stock_actual < detalle.cantidad) {
          throw new Error(`Stock insuficiente para el producto: ${producto.nombre}. Quedan ${producto.stock_actual} unidades.`);
        }

        producto.stock_actual -= detalle.cantidad;
        await queryRunner.manager.save(producto); // Guardamos el nuevo stock

        // B) Guardar el renglón del ticket (DetalleVenta)
        const nuevoDetalle = queryRunner.manager.create(DetalleVenta, {
          venta_id: ventaGuardada.id_venta,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.cantidad * detalle.precio_unitario
        });
        await queryRunner.manager.save(nuevoDetalle);
      }

      // Si todo sale bien, confirmamos (Commit) todos los cambios a la BD
      await queryRunner.commitTransaction();

      // Retornamos la venta completa para que el Frontend la muestre o imprima
      return this.rep.findOneOrFail({ 
        where: { id_venta: ventaGuardada.id_venta },
        relations: ['cliente', 'empleado', 'detalles', 'detalles.producto']
      });

    } catch (error) {
      // Si algo falla (ej. sin stock), revertimos ABSOLUTAMENTE TODO (Rollback)
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberamos el proceso de la BD
      await queryRunner.release();
    }
  }
}