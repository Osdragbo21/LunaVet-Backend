import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../../entities/ventas/venta.entity';
import { CreateVentaInput } from '../../dtos/venta/create-venta.input';

@Injectable()
export class VentaService {
    constructor(@InjectRepository(Venta) private rep: Repository<Venta>) {}
    findAll(): Promise<Venta[]> { return this.rep.find({ relations: ['cliente', 'empleado'] }); }
    create(input: CreateVentaInput): Promise<Venta> { return this.rep.save(this.rep.create(input)); }
}