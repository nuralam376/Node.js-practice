import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entity/user.entity";
import { LoggerMiddleware } from "./middleware";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule implements NestModule {
    configure(consumer : MiddlewareConsumer) {
       consumer
        .apply(LoggerMiddleware)
        .forRoutes({
            path: "user",
            method: RequestMethod.GET
        });
    }
}