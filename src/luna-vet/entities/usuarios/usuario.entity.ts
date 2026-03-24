import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Rol } from '../roles/rol.entity';

@ObjectType()
@Entity('usuarios')
export class Usuario {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column()
    password_hash: string;

    @Field(() => Int)
    @Column()
    rol_id: number;

    // Relación: Muchos Usuarios pertenecen a un Rol
    @Field(() => Rol)
    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    @JoinColumn({ name: 'rol_id' }) // Obligamos a que la llave foránea se llame rol_id
    rol: Rol;

    @Field()
    @Column({ default: true })
    activo: boolean;

    @Field()
    @CreateDateColumn()
    created_at: Date;
}