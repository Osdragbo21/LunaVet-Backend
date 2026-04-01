import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Producto } from '../../entities/productos/producto.entity';
import { ProductoService } from '../../services/producto/producto.service';
import { CreateProductoInput } from '../../dtos/producto/create-producto.input';
import { UpdateProductoInput } from '../../dtos/producto/update-producto.input';

@Resolver(() => Producto)
export class ProductoResolver {
  constructor(private readonly srv: ProductoService) {}
  
  @Query(() => [Producto], { name: 'productos' }) 
  findAll() { 
    return this.srv.findAll(); 
  }
  
  @Mutation(() => Producto) 
  createProducto(@Args('createInput') input: CreateProductoInput) { 
    return this.srv.create(input); 
  }

  // MUTACIÓN: Actualiza un producto existente
  @Mutation(() => Producto)
  updateProducto(@Args('updateProductoInput') updateProductoInput: UpdateProductoInput) {
    return this.srv.update(updateProductoInput.id_producto, updateProductoInput);
  }

  // =========================================================
  // NUEVA MUTACIÓN: Eliminar un producto
  // =========================================================
  @Mutation(() => Boolean)
  removeProducto(@Args('id', { type: () => Int }) id: number) {
    return this.srv.remove(id);
  }
}