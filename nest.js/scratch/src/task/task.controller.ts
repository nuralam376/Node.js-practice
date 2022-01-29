import { Body, Controller, Delete, Get , Param, Post} from "@nestjs/common";
import { TaskDTO } from "./dto/task.dto";
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
    async addTask(@Body() task : TaskDTO) : Promise<Task> {
        return await this.taskService.addTask(task);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id : string) : Promise<Task []> {
        return await this.taskService.deleteTask(id);
    }

}