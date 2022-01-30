import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    async getAllUsers() : Promise<User[]> {
        return this.userRepository.find({});
    }

    async getUser(id : number) : Promise<User> {
        const users = this.userRepository.findOne({
            id : id
        });

        if(users && Array.isArray(users) && users.length > 0) {
            return Promise.resolve(users[0]);
        }

        throw new NotFoundException({
            error : "User not found"
        });
    }

    async postUser(user : User) : Promise<User> {
        const userDetails = new User();

        return await this.userRepository.save(userDetails);
    }

    async deleteUser(id : number) {
        await this.userRepository.delete({
            id : id
        });
    }
}