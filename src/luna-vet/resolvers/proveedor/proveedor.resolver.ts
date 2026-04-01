import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Proveedor } from '../../entities/proveedores/proveedor.entity';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { CreateProveedorInput } from '../../dtos/proveedor/create-proveedor.input';
import { UpdateProveedorInput } from '../../dtos/proveedor/update-proveedor.input';

@Resolver(() => Proveedor)
export class ProveedorResolver {
  constructor(private readonly srv: ProveedorService) {}
  
  @Query(() => [Proveedor], { name: 'proveedores' }) 
  findAll() { 
    return this.srv.findAll(); 
  }
  
  @Mutation(() => Proveedor) 
  createProveedor(@Args('createInput') input: CreateProveedorInput) { 
    return this.srv.create(input); 
  }

  // ==========================================
  // MUTACIÓN PARA ACTUALIZAR (AQUÍ ESTABA EL ERROR)
  // ==========================================
  @Mutation(() => Proveedor)
  updateProveedor(@Args('updateInput') updateInput: UpdateProveedorInput) {
    return this.srv.update(updateInput.id_proveedor, updateInput);
  }

  @Mutation(() => Boolean)
  removeProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.srv.remove(id);
  }
}