import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArchivoConsulta } from '../../entities/archivos-consulta/archivo-consulta.entity';
import { ArchivoConsultaService } from '../../services/archivoConsulta/archivo-consulta.service';
import { CreateArchivoConsultaInput } from '../../dtos/archivoConsulta/create-archivo-consulta.input';

@Resolver(() => ArchivoConsulta)
export class ArchivoConsultaResolver {
    constructor(private readonly archivoService: ArchivoConsultaService) {}

    @Query(() => [ArchivoConsulta], { name: 'archivosConsulta' })
    findAll() {
        return this.archivoService.findAll();
    }

    @Mutation(() => ArchivoConsulta)
    createArchivoConsulta(@Args('createInput') createInput: CreateArchivoConsultaInput) {
        return this.archivoService.create(createInput);
    }
}