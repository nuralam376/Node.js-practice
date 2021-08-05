import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthServices } from './auth.service';
import { CurrentUser } from './decorators/custom-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthServices,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // return this.userService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('users/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.userService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('users')
  findUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/users/:id')
  async removeUser(id: string) {
    const user = await this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.remove(+id);
  }

  @Patch('/users/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.update(+id, body);
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  // @Get('access')
  // getAccess(@Session() session: any) {
  //   return this.userService.findOne(session.userId);
  // }

  @Get('access')
  @UseGuards(AuthGuard)
  getAccess(@CurrentUser() user: User) {
    return user;
  }

  @Get('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
