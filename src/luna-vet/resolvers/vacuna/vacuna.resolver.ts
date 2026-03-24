import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Vacuna } from '../../entities/vacunas/vacuna.entity';
import { VacunaService } from '../../services/vacuna/vacuna.service';
import { CreateVacunaInput } from '../../dtos/vacuna/create-vacuna.input';

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
}