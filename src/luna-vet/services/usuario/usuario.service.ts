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
}