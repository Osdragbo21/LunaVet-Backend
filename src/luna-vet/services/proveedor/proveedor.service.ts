import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../../entities/proveedores/proveedor.entity';
import { CreateProveedorInput } from '../../dtos/proveedor/create-proveedor.input';

@Injectable()
export class ProveedorService {
  constructor(@InjectRepository(Proveedor) private rep: Repository<Proveedor>) {}
  findAll(): Promise<Proveedor[]> { return this.rep.find(); }
  create(input: CreateProveedorInput): Promise<Proveedor> { return this.rep.save(this.rep.create(input)); }
}