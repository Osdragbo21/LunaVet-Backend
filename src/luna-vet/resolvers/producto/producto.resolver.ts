import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Producto } from '../../entities/productos/producto.entity';
import { ProductoService } from '../../services/producto/producto.service';
import { CreateProductoInput } from '../../dtos/producto/create-producto.input';

@Resolver(() => Producto)
export class ProductoResolver {
    constructor(private readonly srv: ProductoService) {}
    @Query(() => [Producto], { name: 'productos' }) findAll() { return this.srv.findAll(); }
    @Mutation(() => Producto) createProducto(@Args('createInput') input: CreateProductoInput) { return this.srv.create(input); }
}