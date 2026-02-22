import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Sistema de Registro de Empleados - API')
    .setDescription('API documentation for employee management system')
    .setVersion('2.0.0')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Empleados', 'Employee management')
    .addTag('Asistencias', 'Attendance tracking')
    .addTag('Licencias', 'Leave requests')
    .addTag('Departamentos', 'Departments')
    .addTag('Cargos', 'Job positions')
    .addTag('Estadísticas', 'Statistics')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
