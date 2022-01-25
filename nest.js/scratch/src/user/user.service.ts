import { Body, Injectable } from "@nestjs/common";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
    public users : User[] = [];
    getAllUsers() : User[] {
        return this.users;
    }

    postUser(user : User) : User {
        if(user) {
            this.users.push(user);
        }
        return user;
    }

    deleteUser(email : string) : User [] {
        const remainingUser = this.users.filter(user => user.email != email);
        return remainingUser;
    }
}