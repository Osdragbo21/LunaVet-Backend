import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Vacuna } from '../../entities/vacunas/vacuna.entity';
import { VacunaService } from '../../services/vacuna/vacuna.service';
import { CreateVacunaInput } from '../../dtos/vacuna/create-vacuna.input';
import { UpdateVacunaInput } from '../../dtos/vacuna/update-vacuna.input';

@Resolver(() => Vacuna)
export class VacunaResolver {
  constructor(private readonly vacunaService: VacunaService) {}

  @Query(() => [Vacuna], { name: 'vacunas' })
  findAll() {
    return this.vacunaService.findAll();
  }

  @Mutation(() => Vacuna)
  createVacuna(@Args('createInput') createInput: CreateVacunaInput) {
    return this.vacunaService.create(createInput);
  }

  // ==========================================
  // NUEVAS MUTACIONES EXPUESTAS
  // ==========================================
  @Mutation(() => Vacuna)
  updateVacuna(@Args('updateInput') updateInput: UpdateVacunaInput) {
    return this.vacunaService.update(updateInput.id_vacuna, updateInput);
  }

  @Mutation(() => Boolean)
  removeVacuna(@Args('id', { type: () => Int }) id: number) {
    return this.vacunaService.remove(id);
  }
}