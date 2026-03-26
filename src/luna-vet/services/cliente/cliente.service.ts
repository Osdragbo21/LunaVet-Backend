import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../entities/clientes/cliente.entity';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { CreateClienteInput } from '../../dtos/cliente/create-cliente.input';
import { RegisterClienteInput } from '../../dtos/cliente/register-cliente.input';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
        // Inyectamos el repositorio de Usuarios para poder insertar credenciales
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    findAll(): Promise<Cliente[]> {
        return this.clienteRepository.find({ relations: ['usuario', 'pacientes'] });
    }

    create(createClienteInput: CreateClienteInput): Promise<Cliente> {
        const newCliente = this.clienteRepository.create(createClienteInput);
        return this.clienteRepository.save(newCliente);
    }

    // NUEVO METODO: Registra Usuario y Cliente en una sola acción
    async registerNewCliente(input: RegisterClienteInput): Promise<Cliente> {
        // 1. Creamos y guardamos el usuario primero (Rol 3 = Cliente)
        const nuevoUsuario = this.usuarioRepository.create({
        username: input.username,
        password_hash: input.password_hash, // En el futuro encriptaremos esto aquí
        rol_id: 3, 
        activo: true,
        });
        const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

        // 2. Creamos y guardamos al Cliente vinculándolo con el ID del usuario recién creado
        const nuevoCliente = this.clienteRepository.create({
        usuario_id: usuarioGuardado.id_usuario,
        nombre_completo: input.nombre_completo,
        telefono_principal: input.telefono_principal,
        direccion: input.direccion,
        });
        const clienteGuardado = await this.clienteRepository.save(nuevoCliente);

        // 3. Retornamos el cliente completo haciendo el join (populate) del usuario
        return this.clienteRepository.findOneOrFail({
        where: { id_cliente: clienteGuardado.id_cliente },
        relations: ['usuario']
        });
    }
}