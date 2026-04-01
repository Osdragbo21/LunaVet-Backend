import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProveedorInput {
  @Field()
  nombre_empresa: string;

  @Field()
  contacto_nombre: string;

  @Field()
  telefono: string;
  
  // ==========================================
  // CAMPOS OPCIONALES AÑADIDOS
  // ==========================================
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  direccion?: string;
}