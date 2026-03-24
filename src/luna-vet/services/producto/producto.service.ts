import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/productos/producto.entity';
import { CreateProductoInput } from '../../dtos/producto/create-producto.input';

@Injectable()
export class ProductoService {
    constructor(@InjectRepository(Producto) private rep: Repository<Producto>) {}
    findAll(): Promise<Producto[]> { return this.rep.find({ relations: ['proveedor'] }); }
    create(input: CreateProductoInput): Promise<Producto> { return this.rep.save(this.rep.create(input)); }
}