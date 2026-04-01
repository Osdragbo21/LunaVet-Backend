import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProveedorInput {
  @Field(() => Int)
  id_proveedor: number;

  @Field({ nullable: true })
  nombre_empresa?: string;

  @Field({ nullable: true })
  contacto_nombre?: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  direccion?: string;
}