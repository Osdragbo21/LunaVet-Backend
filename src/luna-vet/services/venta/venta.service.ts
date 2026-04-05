import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from '../../entities/ventas/venta.entity';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { DetalleServicioVenta } from '../../entities/detalles-servicios-venta/detalle-servicio-venta.entity';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';
import { UpdateVentaInput } from '../../dtos/venta/update-venta.input';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private rep: Repository<Venta>,
    private dataSource: DataSource 
  ) {}

  findAll(): Promise<Venta[]> { 
    return this.rep.find({ 
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

      // 1. Procesar Productos
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
        }
      }

      // 2. Procesar Servicios
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

  async update(id: number, updateInput: UpdateVentaInput): Promise<Venta> {
    const venta = await this.rep.preload({
      ...updateInput,
      id_venta: id,
    } as any);

    if (!venta) throw new Error(`Venta con ID ${id} no encontrada`);
    const ventaActualizada = await this.rep.save(venta);

    return this.rep.findOneOrFail({
      where: { id_venta: ventaActualizada.id_venta },
      relations: ['cliente', 'empleado', 'detalles', 'detalles.producto', 'detalles_servicios', 'detalles_servicios.servicio']
    });
  }
}
