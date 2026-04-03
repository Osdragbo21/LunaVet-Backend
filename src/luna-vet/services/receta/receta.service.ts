import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Receta } from '../../entities/recetas/receta.entity';
import { DetalleReceta } from '../../entities/detalles-receta/detalle-receta.entity';
import { CreateRecetaInput } from '../../dtos/receta/create-receta.input';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private recetaRepository: Repository<Receta>,
    private dataSource: DataSource // Inyectamos DataSource para Transacciones
  ) {}

  findAll(): Promise<Receta[]> {
    return this.recetaRepository.find({ relations: ['consulta', 'detalles', 'detalles.medicamento'] });
  }

  // MÉTODO TRANSACCIONAL: Guarda receta y detalles en bloque
  async create(input: CreateRecetaInput): Promise<Receta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Guardar cabecera de la Receta
      const nuevaReceta = queryRunner.manager.create(Receta, {
        consulta_id: input.consulta_id,
        observaciones_generales: input.observaciones_generales
      });
      const recetaGuardada = await queryRunner.manager.save(nuevaReceta);

      // 2. Guardar los medicamentos recetados si los hay
      if (input.detalles && input.detalles.length > 0) {
        for (const detalle of input.detalles) {
          const nuevoDetalle = queryRunner.manager.create(DetalleReceta, {
            receta_id: recetaGuardada.id_receta,
            medicamento_id: detalle.medicamento_id,
            dosis: detalle.dosis,
            frecuencia: detalle.frecuencia,
            duracion_dias: detalle.duracion_dias
          });
          await queryRunner.manager.save(nuevoDetalle);
        }
      }

      await queryRunner.commitTransaction();

      // Devolvemos el objeto completo para el Frontend
      return this.recetaRepository.findOneOrFail({
        where: { id_receta: recetaGuardada.id_receta },
        relations: ['consulta', 'detalles', 'detalles.medicamento']
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}