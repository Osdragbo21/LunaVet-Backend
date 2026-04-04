import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateArchivoConsultaInput {
  @Field(() => Int)
  consulta_id: number;

  // NUEVO CAMPO OBLIGATORIO DESDE EL FRONTEND
  @Field()
  nombre_archivo: string;

  @Field()
  url_archivo: string;

  @Field()
  tipo_documento: string;
}