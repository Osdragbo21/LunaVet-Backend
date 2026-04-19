import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cita } from '../../entities/citas/cita.entity';
import { CreateCitaInput } from '../../dtos/cita/create-cita.input';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,
  ) {}

  // Traemos las citas con la información del paciente y el médico para la UI
  findAll(): Promise<Cita[]> {
    return this.citaRepository.find({ 
      relations: ['paciente', 'paciente.cliente', 'empleado'],
      order: { fecha_hora: 'DESC' }
    });
  }

  // =========================================================
  // CREACIÓN DE CITA (CON REGLAS DE NEGOCIO Y HORARIOS)
  // =========================================================
  async create(input: CreateCitaInput): Promise<Cita> {
    const fechaSolicitada = new Date(input.fecha_hora);
    const diaSemana = fechaSolicitada.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hora = fechaSolicitada.getHours();

    // 1. VALIDACIÓN DE HORARIO DE ATENCIÓN
    if (input.origen_cita !== 'Urgencia') {
      // Regla: No abrimos los domingos
      if (diaSemana === 0) {
        throw new Error('La clínica está cerrada los domingos. Solo se atienden Urgencias.');
      }

      // Regla: Lunes a Viernes (8:00 AM - 8:00 PM) -> Horas válidas de 8 a 19 (hasta las 19:59)
      if (diaSemana >= 1 && diaSemana <= 5) {
        if (hora < 8 || hora >= 20) {
          throw new Error('El horario de Lunes a Viernes es de 8:00 AM a 8:00 PM.');
        }
      }

      // Regla: Sábados (9:00 AM - 5:00 PM) -> Horas válidas de 9 a 16 (hasta las 16:59)
      if (diaSemana === 6) {
        if (hora < 9 || hora >= 17) {
          throw new Error('El horario de los Sábados es de 9:00 AM a 5:00 PM.');
        }
      }
    }

    // 2. VALIDACIÓN DE EMPALME (1 HORA DE DURACIÓN)
    // Rango de peligro: 59 minutos antes y 59 minutos después
    const ventanaInicio = new Date(fechaSolicitada.getTime() - (59 * 60000));
    const ventanaFin = new Date(fechaSolicitada.getTime() + (59 * 60000));

    const citaEmpalmada = await this.citaRepository.findOne({
      where: {
        empleado_id: input.empleado_id, 
        fecha_hora: Between(ventanaInicio, ventanaFin),
        estado: 'Agendada' // Solo verificamos empalmes con citas activas
      }
    });

    if (citaEmpalmada) {
      throw new Error('El médico ya tiene una cita agendada que choca con este horario. Por favor, selecciona un espacio con al menos 1 hora de diferencia.');
    }

    // 3. GUARDADO EXITOSO
    const nuevaCita = this.citaRepository.create(input);
    const citaGuardada = await this.citaRepository.save(nuevaCita);

    // Retornamos la cita con sus relaciones para evitar errores en Apollo/GraphQL
    return this.citaRepository.findOneOrFail({
      where: { id_cita: citaGuardada.id_cita },
      relations: ['paciente', 'empleado']
    });
  }

  // =========================================================
  // ACTUALIZACIÓN RÁPIDA DE ESTADO (Ej: Agendada -> Completada)
  // =========================================================
  async updateEstado(id: number, nuevoEstado: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({ where: { id_cita: id } });
    if (!cita) {
      throw new Error(`Cita con ID ${id} no encontrada`);
    }

    cita.estado = nuevoEstado;
    return this.citaRepository.save(cita);
  }
}