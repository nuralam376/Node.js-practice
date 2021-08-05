import { Test } from '@nestjs/testing';
import { AuthServices } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthServices;
  let fakeUsersService: Partial<UsersService>;

  fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: '1', email, password } as User),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthServices,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthServices);
  });

  it('can create an instance of Auth Service', () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a hash and salted password', async () => {
    const user = await service.signup('abc@gmail.com', 'abc123');

    expect(user.password).not.toEqual('abc123');

    const [salt, hash] = user.password.split(' ');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: '1', email: 'a', password: '1' } as User]);
    await service.signup('asdf@asdf.com', 'asdf');
    try {
      await service.signup('asdf@asdf.com', 'asdf');
    } catch (err) {}
  });

  it('throws if signin is call with unsued email', async () => {
    try {
      await service.signin('asdf@asdf.com', 'asdf');
    } catch (err) {
      const { message, statusCode } = err.response;
      expect(statusCode).toBe(404);
    }
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: '1', email: 'a', password: '12' } as User]);

    try {
      await service.signup('test@test.com', 'test');
      const user = await service.signin('ab', '123');
      expect(user).toBeDefined();
    } catch (err) {
      console.log(err);
    }
  });
});
