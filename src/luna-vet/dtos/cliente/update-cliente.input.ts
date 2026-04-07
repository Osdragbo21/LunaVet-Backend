import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateClienteInput {
  @Field(() => Int)
  id_cliente!: number;

  @Field({ nullable: true })
  nombre_completo?: string;

  @Field({ nullable: true })
  telefono_principal?: string;

  @Field({ nullable: true })
  direccion?: string;

  @Field({ nullable: true })
  correo?: string;
}