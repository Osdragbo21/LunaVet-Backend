import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateServicioInput {
  @Field(() => Int)
  id_servicio: number;

  @Field({ nullable: true })
  nombre_servicio?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Float, { nullable: true })
  costo_base?: number;
}