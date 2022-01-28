import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
    public users : User[] = [];
    async getAllUsers() : Promise<User[]> {
        return this.users;
    }

    async getUser(username : string) : Promise<User> {
        const users = this.users.filter(user => user.username === username);

        if(users && Array.isArray(users) && users.length > 0) {
            return Promise.resolve(users[0]);
        }

        throw new NotFoundException({
            error : "User not found"
        });
    }

    postUser(user : User) : User {
        if(user) {
            this.users.push(user);
        }
        return user;
    }

    deleteUser(email : string) : User [] {
        const remainingUser = this.users.filter(user => user.email != email);
        this.users = remainingUser;
        return remainingUser;
    }
}