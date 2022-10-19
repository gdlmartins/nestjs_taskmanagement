import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
    private task: Task;
    private tasks: Task[] = [];


    geAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task
    }
    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    deleteTask(id: string): void {
        const result =
            this.tasks.filter((task) => task.id !== id)
        this.tasks = result;
    }

    updateTaskStatus(id: string, status:TaskStatus ):Task{
       
    const task = this.getTaskById(id);
    task.status = status; 

        return task
    }

}
