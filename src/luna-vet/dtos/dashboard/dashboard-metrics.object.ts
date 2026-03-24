import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ChartData {
    @Field()
    label: string;

    @Field(() => Int)
    value: number;
}

@ObjectType()
export class DashboardMetrics {
    @Field(() => Int)
    totalPacientesActivos: number;

    @Field(() => Int)
    citasHoy: number;

    @Field(() => Int)
    productosStockBajo: number;

    @Field(() => Float)
    ingresosMes: number;

    @Field(() => [ChartData])
    graficaCitas: ChartData[];

    @Field(() => [ChartData])
    graficaEspecies: ChartData[];
}