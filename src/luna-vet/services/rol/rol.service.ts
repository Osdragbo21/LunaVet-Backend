import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../entities/roles/rol.entity';
import { CreateRolInput } from '../../dtos/rol/create-rol.input';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private rolRepository: Repository<Rol>,
    ) {}

    findAll(): Promise<Rol[]> {
        // Al pedir roles, traemos también los usuarios asociados gracias a relations
        return this.rolRepository.find({ relations: ['usuarios'] });
    }

    create(createRolInput: CreateRolInput): Promise<Rol> {
        const newRol = this.rolRepository.create(createRolInput);
        return this.rolRepository.save(newRol);
    }
}