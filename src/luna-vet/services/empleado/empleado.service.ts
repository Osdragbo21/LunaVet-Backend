import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../../entities/empleados/empleado.entity';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { CreateEmpleadoInput } from '../../dtos/empleado/create-empleado.input';
import { RegisterEmpleadoInput } from '../../dtos/empleado/register-empleado.input';
import { UpdateEmpleadoInput } from '../../dtos/empleado/update-empleado.input';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, // Inyectamos Usuario
  ) {}

  findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find({ relations: ['usuario', 'especialidades'] });
  }

  create(createEmpleadoInput: CreateEmpleadoInput): Promise<Empleado> {
    const newEmpleado = this.empleadoRepository.create(createEmpleadoInput);
    return this.empleadoRepository.save(newEmpleado);
  }

  // =========================================================
  // MÉTODO: Registra Usuario y Empleado en un solo paso
  // =========================================================
  async registerNewEmpleado(input: RegisterEmpleadoInput): Promise<Empleado> {
    // 1. Crear y guardar credenciales
    const nuevoUsuario = this.usuarioRepository.create({
      username: input.username,
      password_hash: input.password_hash,
      rol_id: input.rol_id,
      activo: true,
    });
    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    // 2. Crear y guardar los datos de RH usando el ID recién generado
    const nuevoEmpleado = this.empleadoRepository.create({
      usuario_id: usuarioGuardado.id_usuario,
      nombre: input.nombre,
      apellido_paterno: input.apellido_paterno,
      apellido_materno: input.apellido_materno,
      telefono: input.telefono,
      email_empleado: input.email_empleado,
      puesto: input.puesto,
      fecha_contratacion: input.fecha_contratacion,
    });
    const empleadoGuardado = await this.empleadoRepository.save(nuevoEmpleado);

    // 3. Retornar el empleado completo con su usuario anidado
    return this.empleadoRepository.findOneOrFail({
      where: { id_empleado: empleadoGuardado.id_empleado },
      relations: ['usuario', 'usuario.rol']
    });
  }

  // =========================================================
  // NUEVO MÉTODO: Actualizar datos de un empleado existente
  // =========================================================
  async update(id: number, updateInput: UpdateEmpleadoInput): Promise<Empleado> {
    const empleado = await this.empleadoRepository.preload({
      ...updateInput,
      id_empleado: id,
    } as any);

    if (!empleado) {
      throw new Error(`Empleado con ID ${id} no encontrado`);
    }

    const empleadoActualizado = await this.empleadoRepository.save(empleado);

    return this.empleadoRepository.findOneOrFail({
      where: { id_empleado: empleadoActualizado.id_empleado },
      relations: ['usuario', 'especialidades']
    });
  }
}