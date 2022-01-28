import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task.interface";

@Injectable()
export class TaskService {
    public tasks : Task[] = [];

    async getAllTasks() : Promise<Task []> {
        return Promise.resolve(this.tasks);
    }

    async getTask(id : string) : Promise<Task> {
        const task = this.tasks.find(task => task.id === id);
        return Promise.resolve(task);
    }

    async addTask(task : Task) : Promise<Task> {
        this.tasks.push(task);
        return Promise.resolve(task);
    }
}