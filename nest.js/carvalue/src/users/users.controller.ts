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
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
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
}
