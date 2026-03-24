import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from '../../entities/servicios/servicio.entity';
import { CreateServicioInput } from '../../dtos/servicio/create-servicio.input';

@Injectable()
export class ServicioService {
    constructor(@InjectRepository(Servicio) private rep: Repository<Servicio>) {}
    findAll(): Promise<Servicio[]> { return this.rep.find(); }
    create(input: CreateServicioInput): Promise<Servicio> { return this.rep.save(this.rep.create(input)); }
}