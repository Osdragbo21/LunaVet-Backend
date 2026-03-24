import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleServicioVenta } from '../../entities/detalles-servicios-venta/detalle-servicio-venta.entity';
import { CreateDetalleServicioVentaInput } from '../../dtos/detalleServicioVenta/create-detalle-servicio-venta.input';

@Injectable()
export class DetalleServicioVentaService {
    constructor(@InjectRepository(DetalleServicioVenta) private rep: Repository<DetalleServicioVenta>) {}
    findAll(): Promise<DetalleServicioVenta[]> { return this.rep.find({ relations: ['venta', 'servicio'] }); }
    create(input: CreateDetalleServicioVentaInput): Promise<DetalleServicioVenta> { return this.rep.save(this.rep.create(input)); }
}