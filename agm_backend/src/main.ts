import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- 1. Importamos o Guarda

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // A ORDEM DE LIBERAÇÃO PARA O FRONTEND (CORS)
  app.enableCors();

  // 2. ATIVAMOS OS GUARDAS GLOBAIS EM TODAS AS ROTAS
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 8080);
}
bootstrap();