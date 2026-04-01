import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProveedorInput } from './create-proveedor.input';

@InputType()
export class UpdateProveedorInput extends PartialType(CreateProveedorInput) {
  @Field(() => Int)
  id_proveedor: number;
}