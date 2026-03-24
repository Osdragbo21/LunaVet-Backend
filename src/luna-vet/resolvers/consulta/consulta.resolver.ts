import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Consulta } from '../../entities/consultas/consulta.entity';
import { ConsultaService } from '../../services/consulta/consulta.service';
import { CreateConsultaInput } from '../../dtos/consulta/create-consulta.input';

@Resolver(() => Consulta)
export class ConsultaResolver {
    constructor(private readonly consultaService: ConsultaService) {}

    @Query(() => [Consulta], { name: 'consultas' })
    findAll() {
        return this.consultaService.findAll();
    }

    @Mutation(() => Consulta)
    createConsulta(@Args('createConsultaInput') createConsultaInput: CreateConsultaInput) {
        return this.consultaService.create(createConsultaInput);
    }
}