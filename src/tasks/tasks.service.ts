import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable() //Injectible makes it possible to inject this service into other components(makes it singleton)
export class TasksService {
  private tasks: Task[] = []; //This is a temporary database

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    //define a temp array to hold the result

    let tasks = this.getAllTasks();

    //do something with status

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    //do something with search

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    //return result
    return tasks;
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
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => {
      task.id !== id;
    });
  }

  updateTaskStatus(id: string, status: TaskStatus): Task[] {
    const task = this.getTaskById(id);
    task.status = status;
    return this.tasks;
  }
}
