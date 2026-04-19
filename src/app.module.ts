import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Importamos nuestro módulo gigante
import { LunaVetModule } from './luna-vet/luna-vet.module';

@Module({
  imports: [
    // 1. Configuración de Variables de Entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Configuración de la Base de Datos (PostgreSQL + TypeORM)
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Intentará leer el .env, si falla, usará los datos duros como respaldo (Fallback)
      host: process.env.DB_HOST || 'db.utvt.cloud',
      port: 5432,
      username: process.env.DB_USERNAME || 'lunavet',
      password: process.env.DB_PASSWORD || '%7sodwNs7W%B', // <-- ESTO EVITA EL ERROR
      database: process.env.DB_NAME || 'db_lunavet',
      autoLoadEntities: true,
      synchronize: false,
    }),

    // 3. Configuración de GraphQL (Enfoque Code-first)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, 
      context: ({ req }) => ({ req }), // <-- NUEVO: Pasa el request HTTP al contexto
    }),

    // 4. Nuestro módulo principal de la veterinaria
    LunaVetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}