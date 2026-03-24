import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../entities/clientes/cliente.entity';
import { CreateClienteInput } from '../../dtos/cliente/create-cliente.input';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    ) {}

    findAll(): Promise<Cliente[]> {
        return this.clienteRepository.find({ relations: ['usuario', 'pacientes'] });
    }

    create(createClienteInput: CreateClienteInput): Promise<Cliente> {
        const newCliente = this.clienteRepository.create(createClienteInput);
        return this.clienteRepository.save(newCliente);
    }
}