import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaLog } from '../../entities/auditorias-log/auditoria-log.entity';
import { CreateAuditoriaLogInput } from '../../dtos/auditoriaLog/create-auditoria-log.input';

@Injectable()
export class AuditoriaLogService {
    constructor(
        @InjectRepository(AuditoriaLog)
        private readonly rep: Repository<AuditoriaLog>,
    ) {}

    findAll(): Promise<AuditoriaLog[]> {
        return this.rep.find({ relations: ['usuario'] });
    }

    create(input: CreateAuditoriaLogInput): Promise<AuditoriaLog> {
        const newLog = this.rep.create(input);
        return this.rep.save(newLog);
    }
}