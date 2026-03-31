import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterEmpleadoInput {
  // Datos para la tabla Usuarios
  @Field() username: string;
  @Field() password_hash: string;
  @Field(() => Int) rol_id: number; // 1 = Admin, 2 = Veterinario

  // Datos para la tabla Empleados
  @Field() nombre: string;
  @Field() apellido_paterno: string;
  @Field() apellido_materno: string;
  @Field() telefono: string;
  @Field() email_empleado: string;
  @Field() puesto: string;
  @Field() fecha_contratacion: Date;
}