import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable() //Injectible makes it possible to inject this service into other components(makes it singleton)
export class TasksService {
  private tasks: Task[] = []; //This is a temporary database

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  idMatch(id: string) {
    this.tasks.find((task) => {
      return task.id === id ? true : false;
    });
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => {
      task.id !== id;
    });
  }
}
