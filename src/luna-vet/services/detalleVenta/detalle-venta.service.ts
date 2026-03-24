import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from '../../entities/detalles-venta/detalle-venta.entity';
import { CreateDetalleVentaInput } from '../../dtos/detalleVenta/create-detalle-venta.input';

@Injectable()
export class DetalleVentaService {
    constructor(@InjectRepository(DetalleVenta) private rep: Repository<DetalleVenta>) {}
    findAll(): Promise<DetalleVenta[]> { return this.rep.find({ relations: ['venta', 'producto'] }); }
    create(input: CreateDetalleVentaInput): Promise<DetalleVenta> { return this.rep.save(this.rep.create(input)); }
}