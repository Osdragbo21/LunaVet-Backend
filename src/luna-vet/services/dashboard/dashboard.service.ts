import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardMetrics } from '../../dtos/dashboard/dashboard-metrics.object';

// Entidades necesarias para calcular las métricas
import { Paciente } from '../../entities/pacientes/paciente.entity';
import { Cita } from '../../entities/citas/cita.entity';
import { Producto } from '../../entities/productos/producto.entity';
import { Venta } from '../../entities/ventas/venta.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Paciente) private pacienteRepo: Repository<Paciente>,
        @InjectRepository(Cita) private citaRepo: Repository<Cita>,
        @InjectRepository(Producto) private productoRepo: Repository<Producto>,
        @InjectRepository(Venta) private ventaRepo: Repository<Venta>,
    ) {}

    async getMetrics(): Promise<DashboardMetrics> {
        // 1. Total de Pacientes
        const totalPacientesActivos = await this.pacienteRepo.count();

        // 2. Citas de Hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const manana = new Date(hoy);
        manana.setDate(manana.getDate() + 1);
        
        const citasHoy = await this.citaRepo.createQueryBuilder('cita')
        .where('cita.fecha_hora >= :hoy', { hoy })
        .andWhere('cita.fecha_hora < :manana', { manana })
        .getCount();

        // 3. Productos con Stock Bajo
        const productosStockBajo = await this.productoRepo.createQueryBuilder('producto')
        .where('producto.stock_actual <= producto.stock_minimo')
        .getCount();

        // 4. Ingresos del Mes Actual
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const ventasMes = await this.ventaRepo.createQueryBuilder('venta')
        .where('venta.fecha_venta >= :inicioMes', { inicioMes })
        .select('SUM(venta.total)', 'total')
        .getRawOne();
        
        const ingresosMes = ventasMes?.total ? parseFloat(ventasMes.total) : 0;

        // 5. Gráfica de Especies (Agrupación)
        const especiesRaw = await this.pacienteRepo.createQueryBuilder('paciente')
        .select('paciente.especie', 'label')
        .addSelect('COUNT(paciente.id_paciente)', 'value')
        .groupBy('paciente.especie')
        .getRawMany();

        const graficaEspecies = especiesRaw.map(e => ({ label: e.label, value: Number(e.value) }));

        // Mock temporal para la gráfica de 6 meses (hasta tener datos reales históricos)
        const graficaCitas = [
        { label: 'Oct', value: 12 }, { label: 'Nov', value: 15 },
        { label: 'Dic', value: 8 }, { label: 'Ene', value: 22 },
        { label: 'Feb', value: 18 }, { label: 'Mar', value: citasHoy }
        ];

        return {
        totalPacientesActivos,
        citasHoy,
        productosStockBajo,
        ingresosMes,
        graficaCitas,
        graficaEspecies
        };
    }
}