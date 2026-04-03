import { InputType, Field, Int } from '@nestjs/graphql';

// Sub-input para recibir los renglones de la receta
@InputType()
export class DetalleRecetaInput {
  @Field(() => Int)
  medicamento_id: number;

  @Field()
  dosis: string;

  @Field()
  frecuencia: string;

  @Field(() => Int)
  duracion_dias: number;
}

@InputType()
export class CreateRecetaInput {
  @Field(() => Int)
  consulta_id: number;

  @Field({ nullable: true })
  observaciones_generales?: string;

  // Recibimos el arreglo de medicamentos recetados
  @Field(() => [DetalleRecetaInput])
  detalles: DetalleRecetaInput[];
}