import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMedicamentoInput {
  @Field()
  nombre: string;

  @Field()
  principio_activo: string;

  @Field()
  presentacion: string;

  @Field(() => Int)
  stock_farmacia: number;
}