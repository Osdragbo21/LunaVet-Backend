import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { CreateUsuarioInput } from '../../dtos/usuario/create-usuario.input';
import { UpdateUsuarioInput } from '../../dtos/usuario/update-usuario.input';
import { LoginInput } from '../../dtos/usuario/login.input';
import { LoginResponse } from '../../dtos/usuario/login.response';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  create(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    const newUsuario = this.usuarioRepository.create(createUsuarioInput);
    return this.usuarioRepository.save(newUsuario);
  }

  // ==========================================
  // NUEVO MÉTODO: Actualizar Usuario (Contraseña/Rol)
  // ==========================================
  async update(id: number, updateInput: UpdateUsuarioInput): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({
      ...updateInput,
      id_usuario: id,
    } as any);

    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return this.usuarioRepository.save(usuario);
  }

  async toggleEstado(id_usuario: number, activo: boolean): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
    if (!usuario) throw new Error(`Usuario con ID ${id_usuario} no encontrado`);
    
    usuario.activo = activo;
    return this.usuarioRepository.save(usuario);
  }

  // ==========================================
  // MÉTODO: Autenticación (Login)
  // ==========================================
  async login(input: LoginInput): Promise<LoginResponse> {
    // 1. Buscamos al usuario por su username e incluimos su Rol
    const usuario = await this.usuarioRepository.findOne({
      where: { username: input.username, activo: true },
      relations: ['rol']
    });

    // 2. Si no existe o está suspendido
    if (!usuario) {
      throw new Error('Credenciales incorrectas o cuenta suspendida.');
    }

    // 3. Verificamos la contraseña
    if (usuario.password_hash !== input.password_hash) {
      throw new Error('Credenciales incorrectas.');
    }

    // 4. Generamos un token básico
    const tokenPayload = `${usuario.id_usuario}:${usuario.username}:${usuario.rol.nombre}`;
    const token = Buffer.from(tokenPayload).toString('base64');

    return {
      access_token: token,
      usuario: usuario
    };
  }
}