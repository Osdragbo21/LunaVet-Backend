import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Hospitalizacion } from '../../entities/hospitalizaciones/hospitalizacion.entity';
import { HospitalizacionService } from '../../services/hospitalizacion/hospitalizacion.service';
import { CreateHospitalizacionInput } from '../../dtos/hospitalizacion/create-hospitalizacion.input';

@Resolver(() => Hospitalizacion)
export class HospitalizacionResolver {
    constructor(private readonly hospitalizacionService: HospitalizacionService) {}

    @Query(() => [Hospitalizacion], { name: 'hospitalizaciones' })
    findAll() {
        return this.hospitalizacionService.findAll();
    }

    @Mutation(() => Hospitalizacion)
    createHospitalizacion(@Args('createInput') createInput: CreateHospitalizacionInput) {
        return this.hospitalizacionService.create(createInput);
    }
}