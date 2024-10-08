import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Board project')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const serverConfig: { port: number } = config.get('server');

  const port = serverConfig.port;
  await app.listen(port);
}
bootstrap();
