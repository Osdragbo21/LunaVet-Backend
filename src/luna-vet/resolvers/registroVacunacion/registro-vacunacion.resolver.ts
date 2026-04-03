import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegistroVacunacion } from '../../entities/registros-vacunacion/registro-vacunacion.entity';
import { RegistroVacunacionService } from '../../services/registroVacunacion/registro-vacunacion.service';
import { CreateRegistroVacunacionInput } from '../../dtos/registroVacunacion/create-registro-vacunacion.input';

@Resolver(() => RegistroVacunacion)
export class RegistroVacunacionResolver {
  constructor(private readonly registroService: RegistroVacunacionService) {}

  @Query(() => [RegistroVacunacion], { name: 'registrosVacunacion' })
  findAll() {
    return this.registroService.findAll();
  }

  // ==========================================
  // NUEVA QUERY: getCartillaPaciente
  // ==========================================
  @Query(() => [RegistroVacunacion], { name: 'getCartillaPaciente' })
  getCartillaPaciente(@Args('paciente_id', { type: () => Int }) paciente_id: number) {
    return this.registroService.findByPaciente(paciente_id);
  }

  @Mutation(() => RegistroVacunacion)
  createRegistroVacunacion(@Args('createInput') createInput: CreateRegistroVacunacionInput) {
    return this.registroService.create(createInput);
  }
}