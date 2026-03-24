import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@ObjectType() // Decorador para GraphQL
@Entity('roles') // Decorador para TypeORM (Postgres)
export class Rol {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Field()
    @Column({ unique: true })
    nombre: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    // Relación: Un Rol puede tener muchos Usuarios
    @Field(() => [Usuario], { nullable: true })
    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}