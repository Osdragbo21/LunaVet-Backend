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

  // Transformador robusto a prueba de zonas horarias para GraphQL
  @Field()
  @Column({ 
    type: 'date',
    transformer: {
      to: (value: any) => value, // Guarda como Date (TypeORM lo pasa a SQL)
      from: (value: any) => {
        if (!value) return null;
        if (value instanceof Date) return value;
        // Agregamos mediodía UTC (T12:00:00Z) para evitar que la zona horaria retrase la fecha un día
        return new Date(typeof value === 'string' && value.length === 10 ? `${value}T12:00:00Z` : value);
      }
    }
  })
  fecha_contratacion: Date;

  // Relación: Un empleado (veterinario) puede tener varias especialidades
  @Field(() => [VeterinarioEspecialidad], { nullable: true })
  @OneToMany(() => VeterinarioEspecialidad, (vetEsp) => vetEsp.empleado)
  especialidades: VeterinarioEspecialidad[];
}