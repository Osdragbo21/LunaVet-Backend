import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoInventario } from '../../entities/movimientos-inventario/movimiento-inventario.entity';
import { CreateMovimientoInventarioInput } from '../../dtos/movimientoInventario/create-movimiento-inventario.input';

@Injectable()
export class MovimientoInventarioService {
    constructor(@InjectRepository(MovimientoInventario) private rep: Repository<MovimientoInventario>) {}
    findAll(): Promise<MovimientoInventario[]> { return this.rep.find({ relations: ['producto', 'empleado'] }); }
    create(input: CreateMovimientoInventarioInput): Promise<MovimientoInventario> { return this.rep.save(this.rep.create(input)); }
}