import { Body, Controller, Get , Param, Post} from "@nestjs/common";
import { Task } from "./interface/task.interface";
import { TaskService } from "./task.service";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService : TaskService) {}
    @Get()
    async getAllTasks() : Promise<Task []> {
        return await this.taskService.getAllTasks();
    }

    @Get("/:id")
    async getTask(@Param("id") id : string) : Promise<Task> {
        return await this.taskService.getTask(id);
    }

    @Post()
    async addTask(@Body() task : Task) : Promise<Task> {
        return await this.taskService.addTask(task);
    }


}