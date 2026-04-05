import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Servicio } from '../../entities/servicios/servicio.entity';
import { ServicioService } from '../../services/servicio/servicio.service';
import { CreateServicioInput } from '../../dtos/servicio/create-servicio.input';
import { UpdateServicioInput } from '../../dtos/servicio/update-servicio.input';

@Resolver(() => Servicio)
export class ServicioResolver {
  constructor(private readonly srv: ServicioService) {}
  
  @Query(() => [Servicio], { name: 'servicios' }) 
  findAll() { return this.srv.findAll(); }
  
  @Mutation(() => Servicio) 
  createServicio(@Args('createInput') input: CreateServicioInput) { return this.srv.create(input); }

  @Mutation(() => Servicio)
  updateServicio(@Args('updateInput') input: UpdateServicioInput) {
    return this.srv.update(input.id_servicio, input);
  }

  @Mutation(() => Boolean)
  removeServicio(@Args('id', { type: () => Int }) id: number) {
    return this.srv.remove(id);
  }
}