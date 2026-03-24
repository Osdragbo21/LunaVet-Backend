import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Medicamento } from '../../entities/medicamentos/medicamento.entity';
import { MedicamentoService } from '../../services/medicamento/medicamento.service';
import { CreateMedicamentoInput } from '../../dtos/medicamento/create-medicamento.input';

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
}