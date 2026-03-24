import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateVentaInput {
    @Field(() => Int) cliente_id: number;

    // Ahora el empleado es opcional
    @Field(() => Int, { nullable: true }) empleado_id?: number;

    @Field(() => Float) total: number;
    @Field() metodo_pago: string;

    // Nuevos campos opcionales al crear (Pedidos Online)
    @Field({ nullable: true }) tipo_venta?: string;
    @Field({ nullable: true }) estado_pedido?: string;
    @Field({ nullable: true }) hora_recogida_estimada?: Date;
}