import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuarios/usuario.entity';
import { CreateUsuarioInput } from '../../dtos/usuario/create-usuario.input';

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
        // Nota: Aquí en el futuro encriptaremos la contraseña con bcrypt antes de guardar
        const newUsuario = this.usuarioRepository.create(createUsuarioInput);
        return this.usuarioRepository.save(newUsuario);
    }

    // NUEVO MÉTODO: Suspender o Activar un usuario
    async toggleEstado(id_usuario: number, activo: boolean): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
        
        if (!usuario) {
        throw new Error(`Usuario con ID ${id_usuario} no encontrado`);
        }

        usuario.activo = activo;
        return this.usuarioRepository.save(usuario);
    }
}