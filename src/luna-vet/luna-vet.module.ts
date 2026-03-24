import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ==========================================
// 1. SEGURIDAD Y AUDITORÍA
// ==========================================
import { Rol } from './entities/roles/rol.entity';
import { Usuario } from './entities/usuarios/usuario.entity';
import { AuditoriaLog } from './entities/auditorias-log/auditoria-log.entity';

import { RolService } from './services/rol/rol.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { AuditoriaLogService } from './services/auditoriaLog/auditoria-log.service';

import { RolResolver } from './resolvers/rol/rol.resolver';
import { UsuarioResolver } from './resolvers/usuario/usuario.resolver';
import { AuditoriaLogResolver } from './resolvers/auditoriaLog/auditoria-log.resolver';

// ==========================================
// 2. RECURSOS HUMANOS
// ==========================================
import { Empleado } from './entities/empleados/empleado.entity';
import { VeterinarioEspecialidad } from './entities/veterinarios-especialidades/veterinario-especialidad.entity';

import { EmpleadoService } from './services/empleado/empleado.service';
import { VeterinarioEspecialidadService } from './services/veterinarioEspecialidad/veterinario-especialidad.service';

import { EmpleadoResolver } from './resolvers/empleado/empleado.resolver';
import { VeterinarioEspecialidadResolver } from './resolvers/veterinarioEspecialidad/veterinario-especialidad.resolver';

// ==========================================
// 3. CLIENTES Y PACIENTES
// ==========================================
import { Cliente } from './entities/clientes/cliente.entity';
import { Paciente } from './entities/pacientes/paciente.entity';

import { ClienteService } from './services/cliente/cliente.service';
import { PacienteService } from './services/paciente/paciente.service';

import { ClienteResolver } from './resolvers/cliente/cliente.resolver';
import { PacienteResolver } from './resolvers/paciente/paciente.resolver';

// ==========================================
// 4. CLÍNICA Y SALUD
// ==========================================
import { Cita } from './entities/citas/cita.entity';
import { Consulta } from './entities/consultas/consulta.entity';
import { ArchivoConsulta } from './entities/archivos-consulta/archivo-consulta.entity';
import { Medicamento } from './entities/medicamentos/medicamento.entity';
import { Receta } from './entities/recetas/receta.entity';
import { DetalleReceta } from './entities/detalles-receta/detalle-receta.entity';
import { Vacuna } from './entities/vacunas/vacuna.entity';
import { RegistroVacunacion } from './entities/registros-vacunacion/registro-vacunacion.entity';
import { Hospitalizacion } from './entities/hospitalizaciones/hospitalizacion.entity';

import { CitaService } from './services/cita/cita.service';
import { ConsultaService } from './services/consulta/consulta.service';
import { ArchivoConsultaService } from './services/archivoConsulta/archivo-consulta.service';
import { MedicamentoService } from './services/medicamento/medicamento.service';
import { RecetaService } from './services/receta/receta.service';
import { DetalleRecetaService } from './services/detalleReceta/detalle-receta.service';
import { VacunaService } from './services/vacuna/vacuna.service';
import { RegistroVacunacionService } from './services/registroVacunacion/registro-vacunacion.service';
import { HospitalizacionService } from './services/hospitalizacion/hospitalizacion.service';

import { CitaResolver } from './resolvers/cita/cita.resolver';
import { ConsultaResolver } from './resolvers/consulta/consulta.resolver';
import { ArchivoConsultaResolver } from './resolvers/archivoConsulta/archivo-consulta.resolver';
import { MedicamentoResolver } from './resolvers/medicamento/medicamento.resolver';
import { RecetaResolver } from './resolvers/receta/receta.resolver';
import { DetalleRecetaResolver } from './resolvers/detalleReceta/detalle-receta.resolver';
import { VacunaResolver } from './resolvers/vacuna/vacuna.resolver';
import { RegistroVacunacionResolver } from './resolvers/registroVacunacion/registro-vacunacion.resolver';
import { HospitalizacionResolver } from './resolvers/hospitalizacion/hospitalizacion.resolver';

// ==========================================
// 5. INVENTARIO Y PROVEEDORES
// ==========================================
import { Proveedor } from './entities/proveedores/proveedor.entity';
import { Producto } from './entities/productos/producto.entity';
import { MovimientoInventario } from './entities/movimientos-inventario/movimiento-inventario.entity';

import { ProveedorService } from './services/proveedor/proveedor.service';
import { ProductoService } from './services/producto/producto.service';
import { MovimientoInventarioService } from './services/movimientoInventario/movimiento-inventario.service';

import { ProveedorResolver } from './resolvers/proveedor/proveedor.resolver';
import { ProductoResolver } from './resolvers/producto/producto.resolver';
import { MovimientoInventarioResolver } from './resolvers/movimientoInventario/movimiento-inventario.resolver';

// ==========================================
// 6. VENTAS Y FACTURACIÓN
// ==========================================
import { Venta } from './entities/ventas/venta.entity';
import { DetalleVenta } from './entities/detalles-venta/detalle-venta.entity';
import { Servicio } from './entities/servicios/servicio.entity';
import { DetalleServicioVenta } from './entities/detalles-servicios-venta/detalle-servicio-venta.entity';

import { VentaService } from './services/venta/venta.service';
import { DetalleVentaService } from './services/detalleVenta/detalle-venta.service';
import { ServicioService } from './services/servicio/servicio.service';
import { DetalleServicioVentaService } from './services/detalleServicioVenta/detalle-servicio-venta.service';

import { VentaResolver } from './resolvers/venta/venta.resolver';
import { DetalleVentaResolver } from './resolvers/detalleVenta/detalle-venta.resolver';
import { ServicioResolver } from './resolvers/servicio/servicio.resolver';
import { DetalleServicioVentaResolver } from './resolvers/detalleServicioVenta/detalle-servicio-venta.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // 1. Seguridad y Auditoría
      Rol, 
      Usuario, 
      AuditoriaLog,
      
      // 2. Recursos Humanos
      Empleado, 
      VeterinarioEspecialidad, 
      
      // 3. Clientes y Pacientes
      Cliente, 
      Paciente, 
      
      // 4. Clínica y Salud
      Cita, 
      Consulta, 
      ArchivoConsulta, 
      Medicamento, 
      Receta, 
      DetalleReceta, 
      Vacuna, 
      RegistroVacunacion, 
      Hospitalizacion,
      
      // 5. Inventario y Proveedores
      Proveedor, 
      Producto, 
      MovimientoInventario,
      
      // 6. Ventas y Facturación
      Venta, 
      DetalleVenta, 
      Servicio, 
      DetalleServicioVenta
    ])
  ],
  providers: [
    // 1. Seguridad y Auditoría
    RolService, RolResolver, 
    UsuarioService, UsuarioResolver,
    AuditoriaLogService, AuditoriaLogResolver,
    
    // 2. Recursos Humanos
    EmpleadoService, EmpleadoResolver, 
    VeterinarioEspecialidadService, VeterinarioEspecialidadResolver,
    
    // 3. Clientes y Pacientes
    ClienteService, ClienteResolver, 
    PacienteService, PacienteResolver,
    
    // 4. Clínica y Salud
    CitaService, CitaResolver, 
    ConsultaService, ConsultaResolver, 
    ArchivoConsultaService, ArchivoConsultaResolver,
    MedicamentoService, MedicamentoResolver, 
    RecetaService, RecetaResolver, 
    DetalleRecetaService, DetalleRecetaResolver,
    VacunaService, VacunaResolver, 
    RegistroVacunacionService, RegistroVacunacionResolver, 
    HospitalizacionService, HospitalizacionResolver,
    
    // 5. Inventario y Proveedores
    ProveedorService, ProveedorResolver, 
    ProductoService, ProductoResolver, 
    MovimientoInventarioService, MovimientoInventarioResolver,
    
    // 6. Ventas y Facturación
    VentaService, VentaResolver, 
    DetalleVentaService, DetalleVentaResolver, 
    ServicioService, ServicioResolver, 
    DetalleServicioVentaService, DetalleServicioVentaResolver
  ],
})
export class LunaVetModule {}