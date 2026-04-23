import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

function getAllowedOrigins() {
  const defaults = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://techrvbusiness.vercel.app',
  ]

  const configuredOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return new Set([...defaults, ...configuredOrigins])
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const allowedOrigins = getAllowedOrigins()
  const allowedOriginPatterns = [/^https:\/\/[a-z0-9-]+\.netlify\.app$/i]

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.has(origin) ||
        allowedOriginPatterns.some((pattern) => pattern.test(origin))
      ) {
        callback(null, true)
        return
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`), false)
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('TechRV API')
    .setDescription('TechRV Computer Solutions Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = Number(process.env.PORT) || 3000
  await app.listen(port)
}

bootstrap()
