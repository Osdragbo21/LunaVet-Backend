import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Paciente } from '../pacientes/paciente.entity';

@ObjectType()
@Entity('clientes')
export class Cliente {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Field(() => Int)
    @Column({ unique: true })
    usuario_id: number;

    // Relación 1 a 1: Un cliente tiene un usuario para acceder al sistema web/móvil
    @Field(() => Usuario)
    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Field()
    @Column()
    nombre_completo: string;

    @Field()
    @Column()
    telefono_principal: string;

    @Field()
    @Column({ type: 'text' })
    direccion: string;

    // Relación: Un cliente puede tener varios pacientes (mascotas)
    @Field(() => [Paciente], { nullable: true })
    @OneToMany(() => Paciente, (paciente) => paciente.cliente)
    pacientes: Paciente[];
}