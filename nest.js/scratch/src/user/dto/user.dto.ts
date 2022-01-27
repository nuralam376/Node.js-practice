import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    email : string;

    @IsString()
    username : string;
}

export class UserParamsDto {
    @IsString()
    @IsNotEmpty()
    username : string
}