import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateVacunaInput {
  @Field(() => Int)
  id_vacuna: number;

  @Field({ nullable: true })
  nombre_vacuna?: string;

  @Field({ nullable: true })
  descripcion?: string;
}