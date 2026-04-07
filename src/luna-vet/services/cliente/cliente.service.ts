import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../entities/clientes/cliente.entity';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { CreateClienteInput } from '../../dtos/cliente/create-cliente.input';
import { UpdateClienteInput } from '../../dtos/cliente/update-cliente.input';
import { RegisterClienteInput } from '../../dtos/cliente/register-cliente.input';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, // Inyectamos Usuario para crear credenciales
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ relations: ['pacientes', 'usuario'] });
  }

  create(createInput: CreateClienteInput): Promise<Cliente> {
    const newRecord = this.clienteRepository.create(createInput);
    return this.clienteRepository.save(newRecord);
  }

  async update(id: number, updateInput: UpdateClienteInput): Promise<Cliente> {
    const cliente = await this.clienteRepository.preload({
      ...updateInput,
      id_cliente: id,
    } as any);

    if (!cliente) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }

    return this.clienteRepository.save(cliente);
  }

  // =========================================================
  // RESTAURADO: Registra Usuario y Cliente en un solo paso
  // =========================================================
  async registerNewCliente(input: RegisterClienteInput): Promise<Cliente> {
    // 1. Crear y guardar credenciales
    const nuevoUsuario = this.usuarioRepository.create({
      username: input.username,
      password_hash: input.password_hash,
      rol_id: 3, // El ID 3 corresponde al rol de 'Cliente' en la BD
      activo: true,
    });
    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    // 2. Crear y guardar los datos del Cliente usando el ID de usuario recién generado
    const nuevoCliente = this.clienteRepository.create({
      usuario_id: usuarioGuardado.id_usuario,
      nombre_completo: input.nombre_completo,
      telefono_principal: input.telefono_principal,
      direccion: input.direccion,
    });
    const clienteGuardado = await this.clienteRepository.save(nuevoCliente);

    // 3. Retornar el cliente completo con su usuario anidado
    return this.clienteRepository.findOneOrFail({
      where: { id_cliente: clienteGuardado.id_cliente },
      relations: ['usuario']
    });
  }
}