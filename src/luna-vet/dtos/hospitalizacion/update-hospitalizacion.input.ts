import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHospitalizacionInput {
  @Field(() => Int)
  id_hospitalizacion: number;

  @Field({ nullable: true })
  fecha_alta?: Date;

  @Field({ nullable: true })
  estado?: string;
}