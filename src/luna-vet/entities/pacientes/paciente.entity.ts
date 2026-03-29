import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Cita } from '../citas/cita.entity';
import { Hospitalizacion } from '../hospitalizaciones/hospitalizacion.entity';

@ObjectType()
@Entity('pacientes')
export class Paciente {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Field(() => Int)
  @Column()
  cliente_id: number;

  @Field(() => Cliente)
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  especie: string;

  @Field()
  @Column()
  raza: string;

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
  fecha_nacimiento: Date;

  @Field()
  @Column()
  genero: string;

  @Field()
  @Column()
  color: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  alergias: string;

  // ==========================================
  // RELACIONES DEL EXPEDIENTE MÉDICO
  // ==========================================
  @Field(() => [Cita], { nullable: true })
  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];

  @Field(() => [Hospitalizacion], { nullable: true })
  @OneToMany(() => Hospitalizacion, (hospitalizacion) => hospitalizacion.paciente)
  hospitalizaciones: Hospitalizacion[];
}