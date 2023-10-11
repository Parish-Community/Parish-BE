import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function Swagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Parish Platform API')
    .setDescription('The Parish Platform API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description:
          'Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI1LCJuYW1lIjoiS29kQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQ3NzEzODUsImV4cCI6MTY1NTM3NjE4NX0.59os0u11Id3niUkcuW5X0IJHkJsF-SxoORyuz-LHB28',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
    },
  });
}
