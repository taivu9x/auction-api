// import { INestApplication } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { UsersService } from 'src/modules/Users/users.service';
// import { UsersController } from 'src/modules/Users/uses.controller';

// describe('Users', () => {
//   let app: INestApplication;
//   let userService = { findAll: () => ['test'] };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService],
//     })
//       .overrideProvider(UsersService)
//       .useValue(userService)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   it(`/GET users`, () => {
//     return request(app.getHttpServer()).get('/users').expect(200).expect({
//       data: userService.findAll(),
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
