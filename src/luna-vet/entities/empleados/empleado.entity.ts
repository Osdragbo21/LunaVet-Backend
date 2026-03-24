import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { VeterinarioEspecialidad } from '../veterinarios-especialidades/veterinario-especialidad.entity';

@ObjectType()
@Entity('empleados')
export class Empleado {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Field(() => Int)
    @Column({ unique: true })
    usuario_id: number;

    // Relación 1 a 1: Un empleado tiene un solo usuario de acceso
    @Field(() => Usuario)
    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    apellido_paterno: string;

    @Field()
    @Column()
    apellido_materno: string;

    @Field()
    @Column()
    telefono: string;

    @Field()
    @Column()
    email_empleado: string;

    @Field()
    @Column()
    puesto: string; // Ej: Veterinario, Recepción, Administrador

    @Field()
    @Column({ type: 'date' })
    fecha_contratacion: Date;

    // Relación: Un empleado (veterinario) puede tener varias especialidades
    @Field(() => [VeterinarioEspecialidad], { nullable: true })
    @OneToMany(() => VeterinarioEspecialidad, (vetEsp) => vetEsp.empleado)
    especialidades: VeterinarioEspecialidad[];
}