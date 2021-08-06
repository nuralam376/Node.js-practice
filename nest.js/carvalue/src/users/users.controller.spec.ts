import { Test, TestingModule } from '@nestjs/testing';
import { AuthServices } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthServices>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([{ id: '1', email, password: 'asdf' }]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id: id.toString(),
          email: 'asdf',
          password: 'asdf',
        } as User);
      },
      // update: () => {},
      // remove: () => {},
    };

    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: '1', email, password } as User);
      },
      // signup: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthServices,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with that given id', async () => {
    const users = await controller.findUsers('asdf@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@gmail.com');
  });

  it('findUser should return a user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with the given id is not found', async () => {
    fakeUsersService.findOne = () => null;

    try {
      await controller.findUser('1');
    } catch (err) {
      const { message, statusCode } = err;
      expect(statusCode).toBe(undefined);
    }
  });

  it('signin updates session object and return user', async () => {
    const session = { userId: 1 };

    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual('1');
    expect(session.userId).toEqual('1');
  });
});
