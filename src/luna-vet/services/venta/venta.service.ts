import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from '../../entities/ventas/venta.entity';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { DetalleServicioVenta } from '../../entities/detalles-servicios-venta/detalle-servicio-venta.entity';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';
import { UpdateVentaInput } from '../../dtos/venta/update-venta.input';
import { MovimientoInventario } from '../../entities/movimientos-inventario/movimiento-inventario.entity';
import { AuditoriaLog } from '../../entities/auditorias-log/auditoria-log.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private rep: Repository<Venta>,
    private dataSource: DataSource 
  ) {}

  findAll(): Promise<Venta[]> { 
    return this.rep.find({ 
      // Añadimos las relaciones de servicios para que GraphQL las resuelva
      relations: [
        'cliente', 
        'empleado', 
        'detalles', 
        'detalles.producto',
        'detalles_servicios',
        'detalles_servicios.servicio'
      ],
      order: { fecha_venta: 'DESC' }
    }); 
  }

  // =========================================================
  // MÉTODO TRANSACCIONAL: Crear Venta POS (Productos + Servicios)
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

      // 1. Procesar Productos (Si existen)
      if (input.detalles_productos && input.detalles_productos.length > 0) {
        for (const detalle of input.detalles_productos) {
          const producto = await queryRunner.manager.findOne(Producto, { where: { id_producto: detalle.producto_id } });
          if (!producto) throw new Error(`El producto con ID ${detalle.producto_id} no existe.`);
          if (producto.stock_actual < detalle.cantidad) throw new Error(`Stock insuficiente para el producto: ${producto.nombre}.`);

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

          // ==========================================
          // NUEVO: Registrar Salida en el Kardex
          // ==========================================
          const nuevoMovimiento = queryRunner.manager.create(MovimientoInventario, {
            producto_id: detalle.producto_id,
            empleado_id: input.empleado_id || 1, // Usamos el cajero, o 1 (Admin) como fallback para online
            tipo_movimiento: 'Salida',
            cantidad: detalle.cantidad,
            motivo: `Venta POS (Ticket #${ventaGuardada.id_venta})`
          });
          await queryRunner.manager.save(nuevoMovimiento);
        }
      }

      // 2. Procesar Servicios Médicos/Estéticos (Si existen)
      if (input.detalles_servicios && input.detalles_servicios.length > 0) {
        for (const serv of input.detalles_servicios) {
          const nuevoDetalleServicio = queryRunner.manager.create(DetalleServicioVenta, {
            venta_id: ventaGuardada.id_venta,
            servicio_id: serv.servicio_id,
            costo_aplicado: serv.costo_aplicado
          });
          await queryRunner.manager.save(nuevoDetalleServicio);
        }
      }

      // ==========================================
      // NUEVO: Registrar acción en el Log de Auditoría
      // ==========================================
      const logAuditoria = queryRunner.manager.create(AuditoriaLog, {
        usuario_id: 1, // Fallback (idealmente viene del JWT de sesión del usuario)
        accion: 'CREATE',
        tabla_afectada: 'ventas',
        detalle: `Nueva venta POS (Ticket #${ventaGuardada.id_venta}) registrada por un total de $${ventaGuardada.total}`
      });
      await queryRunner.manager.save(logAuditoria);

      await queryRunner.commitTransaction();

      return this.rep.findOneOrFail({ 
        where: { id_venta: ventaGuardada.id_venta },
        relations: ['cliente', 'empleado', 'detalles', 'detalles.producto', 'detalles_servicios', 'detalles_servicios.servicio']
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // =========================================================
  // MÉTODO: Actualizar Venta
  // =========================================================
  async update(id: number, updateInput: UpdateVentaInput): Promise<Venta> {
    const venta = await this.rep.preload({
      ...updateInput,
      id_venta: id,
    } as any);

    if (!venta) throw new Error(`Venta con ID ${id} no encontrada`);
    const ventaActualizada = await this.rep.save(venta);

    // ==========================================
    // NUEVO: Registrar actualización en Auditoría
    // ==========================================
    const logAuditoria = this.dataSource.manager.create(AuditoriaLog, {
      usuario_id: 1,
      accion: 'UPDATE',
      tabla_afectada: 'ventas',
      detalle: `Se actualizó la información de la Venta #${ventaActualizada.id_venta}`
    });
    await this.dataSource.manager.save(logAuditoria);

    return this.rep.findOneOrFail({
      where: { id_venta: ventaActualizada.id_venta },
      relations: ['cliente', 'empleado', 'detalles', 'detalles.producto', 'detalles_servicios', 'detalles_servicios.servicio']
    });
  }
}