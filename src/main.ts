import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitamos CORS para que React (localhost:5173) pueda consumir la API
  app.enableCors({
    origin: 'http://localhost:5173', // El puerto por defecto de Vite/React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();