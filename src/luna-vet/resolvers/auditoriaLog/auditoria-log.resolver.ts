import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuditoriaLog } from '../../entities/auditorias-log/auditoria-log.entity';
import { AuditoriaLogService } from '../../services/auditoriaLog/auditoria-log.service';
import { CreateAuditoriaLogInput } from '../../dtos/auditoriaLog/create-auditoria-log.input';

@Resolver(() => AuditoriaLog)
export class AuditoriaLogResolver {
    constructor(private readonly srv: AuditoriaLogService) {}

    @Query(() => [AuditoriaLog], { name: 'auditoriasLog' })
    findAll() {
        return this.srv.findAll();
    }

    @Mutation(() => AuditoriaLog)
    createAuditoriaLog(@Args('createInput') input: CreateAuditoriaLogInput) {
        return this.srv.create(input);
    }
}