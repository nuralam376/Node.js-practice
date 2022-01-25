import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
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
    postUser(@Body() user: User) {
        return this.userService.postUser(user);
    }

    @Delete("/:email")
    deleteUser(@Param('email') email : string) {
        return this.userService.deleteUser(email);
    }
}