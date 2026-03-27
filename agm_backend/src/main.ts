import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // A ORDEM DE LIBERAÇÃO PARA O FRONTEND (CORS)
  app.enableCors();

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
