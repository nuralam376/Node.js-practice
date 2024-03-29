import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        console.log("body ", body);
    }
}
