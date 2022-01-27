import { Body, Controller, Delete, Get, Header, HttpCode, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDto, UserParamsDto } from "./dto/user.dto";
import { User } from "./interface/user.interface";
import { UserService } from "./user.service";
import {Request, Response} from "express";

@Controller("user")
export class UserController {
    constructor(private readonly userService : UserService) {}

    // @HttpCode(201)
    @Get()
    @Header('Cache-Control', 'none')
    async getUsers(
        // @Param("id", ParseIntPipe) id : number
        // @Req() request: Request
        // @Res() response : Response
    ) : Promise<User []>{
        // console.log("id", response);
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