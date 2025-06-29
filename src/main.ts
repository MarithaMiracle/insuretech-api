
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Insuretech API')
    .setDescription('API for buying plans, activating policies, and managing wallet')
    .setVersion('1.0')
    // .addTag('Plans')
    .addTag('Products')
    .addTag('Policies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // docs at /api

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`✅ Server is running at http://localhost:${port}`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();
