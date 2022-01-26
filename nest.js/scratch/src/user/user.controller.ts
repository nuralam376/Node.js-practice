import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDto, UserParamsDto } from "./dto/user.dto";
import { User } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Get()
    getUsers() {
        return this.userService.getAllUsers();
    }

    @Post() 
    @UsePipes(new ValidationPipe({

    }))
    postUser(@Body() user: UserDto) {
        return this.userService.postUser(user);
    }

    @Get("/:username")
    getUser(@Param() params : UserParamsDto) : User {
        return this.userService.getUser(params.username);
    }

    @Delete("/:email")
    deleteUser(@Param('email') email : string) {
        return this.userService.deleteUser(email);
    }
}