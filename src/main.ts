import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import helmet from 'helmet';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' });

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  await app.listen(PORT, () =>
    console.log(
      `Сервер подключен на порту: ${PORT}, в режиме: ${process.env.NODE_ENV}`,
    ),
  );
}
bootstrap();
