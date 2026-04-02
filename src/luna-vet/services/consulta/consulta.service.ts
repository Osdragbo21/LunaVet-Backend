import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from '../../entities/consultas/consulta.entity';
import { CreateConsultaInput } from '../../dtos/consulta/create-consulta.input';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
  ) {}

  // =========================================================
  // MÉTODO ACTUALIZADO: Trae el expediente completo
  // Incluye la Cita, el Paciente y el Médico (Empleado)
  // =========================================================
  findAll(): Promise<Consulta[]> {
    return this.consultaRepository.find({ 
      relations: [
        'cita', 
        'cita.paciente', 
        'cita.empleado', 
        'archivos'
      ],
      order: { id_consulta: 'DESC' } // Ordenamos de la más reciente a la más antigua
    });
  }

  create(createConsultaInput: CreateConsultaInput): Promise<Consulta> {
    const newConsulta = this.consultaRepository.create(createConsultaInput);
    return this.consultaRepository.save(newConsulta);
  }
}