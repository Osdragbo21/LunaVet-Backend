import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePacienteInput } from './create-paciente.input';

@InputType()
export class UpdatePacienteInput extends PartialType(CreatePacienteInput) {
    @Field(() => Int)
    id_paciente: number;
}