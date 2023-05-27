// create test support for auth module
// Path: test/auth/auth.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import * as request from 'supertest';

const user = {
  email: 'vuanhtai1997@gmail.com',
  password: 'test',
};

describe('Auth', () => {
  let app: INestApplication;
  const authService = { findAll: () => ['vuanhtai1997@gmail.com'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/POST register`, () => {
    return request(app.getHttpServer()).post('/auth/register').send(user).expect(201).expect({
      data: authService.findAll(),
    });
  });

  it(`/POST login`, () => {
    return request(app.getHttpServer()).post('/auth/login').send(user).expect(201).expect({
      data: authService.findAll(),
    });
  });
});
