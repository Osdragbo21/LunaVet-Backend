import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Medicamento } from '../../entities/medicamentos/medicamento.entity';
import { MedicamentoService } from '../../services/medicamento/medicamento.service';
import { CreateMedicamentoInput } from '../../dtos/medicamento/create-medicamento.input';
import { UpdateMedicamentoInput } from '../../dtos/medicamento/update-medicamento.input';

@Resolver(() => Medicamento)
export class MedicamentoResolver {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @Query(() => [Medicamento], { name: 'medicamentos' })
  findAll() {
    return this.medicamentoService.findAll();
  }

  @Mutation(() => Medicamento)
  createMedicamento(@Args('createInput') createInput: CreateMedicamentoInput) {
    return this.medicamentoService.create(createInput);
  }

  // ==========================================
  // NUEVAS MUTACIONES EXPUESTAS
  // ==========================================
  @Mutation(() => Medicamento)
  updateMedicamento(@Args('updateInput') updateInput: UpdateMedicamentoInput) {
    return this.medicamentoService.update(updateInput.id_medicamento, updateInput);
  }

  @Mutation(() => Boolean)
  removeMedicamento(@Args('id', { type: () => Int }) id: number) {
    return this.medicamentoService.remove(id);
  }
}