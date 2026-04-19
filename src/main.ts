import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // Permite peticiones desde el frontend en producción y desde local
    origin: ['https://lunavet.utvt.cloud', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    // ====================================================================
    // FIX: Lista blanca de Headers explícita para que pase el Preflight (OPTIONS)
    // ====================================================================
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Apollo-Require-Preflight'],
  });

  // PandoraXDN usa el NODE_PORT=3021
  const port = process.env.NODE_PORT || 3021;
  await app.listen(port);
  console.log(`🚀 Servidor LunaVet corriendo en el puerto: ${port}`);
}
bootstrap();