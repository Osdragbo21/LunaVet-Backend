import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@ObjectType()
@Entity('auditoria_log')
export class AuditoriaLog {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_log: number;

    @Field(() => Int)
    @Column()
    usuario_id: number;

    // Relación: Una auditoria pertenece a un usuario (el que hizo la acción)
    @Field(() => Usuario)
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Field()
    @Column()
    accion: string; // Ej: "CREAR", "ACTUALIZAR", "ELIMINAR"

    @Field()
    @Column()
    tabla_afectada: string;

    @Field()
    @CreateDateColumn()
    fecha: Date;
}