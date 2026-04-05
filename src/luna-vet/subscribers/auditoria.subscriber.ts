import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { AuditoriaLog } from '../entities/auditorias-log/auditoria-log.entity';

@Injectable()
export class AuditoriaSubscriber implements EntitySubscriberInterface {
  // Añadimos Logger para ver en la terminal del backend qué pasa en tiempo real
  private readonly logger = new Logger('AuditoriaSubscriber');

  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  // FIX: En TypeORM 0.3.x, para escuchar TODAS las tablas, 
  // la mejor práctica es NO implementar el método listenTo() en absoluto.

  private shouldLog(tableName?: string): boolean {
    if (!tableName) return false;
    if (tableName === 'auditoria_log' || tableName === 'movimientos_inventario') return false;
    return true;
  }

  private getEntityId(metadata: any, entity: any): string {
    if (!entity || !metadata || !metadata.primaryColumns || metadata.primaryColumns.length === 0) return 'N/A';
    try {
      const idColumn = metadata.primaryColumns[0].propertyName;
      return entity[idColumn] ? String(entity[idColumn]) : 'N/A';
    } catch {
      return 'N/A';
    }
  }

  async afterInsert(event: InsertEvent<any>) {
    if (!event.metadata || !this.shouldLog(event.metadata.tableName)) return;
    const id = this.getEntityId(event.metadata, event.entity);

    try {
      await event.manager.getRepository(AuditoriaLog).insert({
        usuario_id: 1, // Fallback
        accion: 'CREATE',
        tabla_afectada: event.metadata.tableName,
        detalle: `Se insertó un nuevo registro en ${event.metadata.tableName}. (ID interno: ${id})`
      });
      this.logger.log(`✅ CREATE registrado para tabla: ${event.metadata.tableName}`);
    } catch (e: any) { this.logger.error(`❌ Error Insert: ${e.message}`); }
  }

  async afterUpdate(event: UpdateEvent<any>) {
    if (!event.metadata || !this.shouldLog(event.metadata.tableName)) return;

    // =================================================================
    // FIX MÁGICO: Extraemos las columnas que realmente cambiaron.
    // Si esta lista está vacía, TypeORM no hizo ningún cambio en BD.
    // =================================================================
    const updatedColumns = event.updatedColumns.map(col => col.propertyName);
    
    if (updatedColumns.length === 0) {
        this.logger.warn(`⚠️ UPDATE omitido en ${event.metadata.tableName} (No hubo cambios reales en los datos enviados desde Frontend)`);
        return;
    }

    const id = this.getEntityId(event.metadata, event.entity || event.databaseEntity);

    try {
      await event.manager.getRepository(AuditoriaLog).insert({
        usuario_id: 1,
        accion: 'UPDATE',
        tabla_afectada: event.metadata.tableName,
        // Mejoramos el detalle para que el Admin sepa exactamente qué campos se editaron
        detalle: `Se modificaron los campos [${updatedColumns.join(', ')}] en ${event.metadata.tableName}. (ID interno: ${id})`
      });
      this.logger.log(`✅ UPDATE registrado para tabla: ${event.metadata.tableName}`);
    } catch (e: any) { this.logger.error(`❌ Error Update: ${e.message}`); }
  }

  async afterRemove(event: RemoveEvent<any>) {
    if (!event.metadata || !this.shouldLog(event.metadata.tableName)) return;
    const id = this.getEntityId(event.metadata, event.databaseEntity || event.entity);

    try {
      await event.manager.getRepository(AuditoriaLog).insert({
        usuario_id: 1,
        accion: 'DELETE',
        tabla_afectada: event.metadata.tableName,
        detalle: `Se eliminó un registro de ${event.metadata.tableName}. (ID interno: ${id})`
      });
      this.logger.log(`✅ DELETE registrado para tabla: ${event.metadata.tableName}`);
    } catch (e: any) { this.logger.error(`❌ Error Remove: ${e.message}`); }
  }
}