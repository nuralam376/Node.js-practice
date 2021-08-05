import { Test, TestingModule } from '@nestjs/testing';
import { AuthServices } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthServices>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => {},
      findOne: () => {},
      update: () => {},
      remove: () => {},
    };

    fakeAuthService = {
      signin: () => {},
      signup: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
