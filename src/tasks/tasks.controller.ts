import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.geAllTasks();
    }

    @Post()
    createTask(
      @Body()createTaskDto: CreateTaskDto
    ):Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id:string
    ): Task{
        return this.tasksService.getTaskById(id)
    }
    @Delete('/:id')
    deleteTask(@Param("id") id: string):void{
        this.tasksService.deleteTask(id)
        console.log("deleted task : ", id )
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
        @Param("id") id: string,
        @Body("status") status: TaskStatus,
    ):Task{
        return this.tasksService.updateTaskStatus(id, status)
    }
}
