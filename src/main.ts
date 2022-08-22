import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
//@ts-expect-error fucking es and commonjs
import * as MongoStore from 'connect-mongo';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET', 'UnsafeSecret'),
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: configService.get('MONGO_URI'),
      }),
      cookie: {
        httpOnly: true,
        maxAge: +configService.get<number>('SESSION_EXP', 3600),
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Ecommerce - Coderhouse')
    .setDescription('API para curso de desarrollo backend coderhouse')
    .setVersion('0.1')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
