import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Servicio } from '../../entities/servicios/servicio.entity';
import { ServicioService } from '../../services/servicio/servicio.service';
import { CreateServicioInput } from '../../dtos/servicio/create-servicio.input';

@Resolver(() => Servicio)
export class ServicioResolver {
    constructor(private readonly srv: ServicioService) {}
    @Query(() => [Servicio], { name: 'servicios' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => Servicio) createServicio(@Args('createInput') input: CreateServicioInput) { return this.srv.create(input); }
}