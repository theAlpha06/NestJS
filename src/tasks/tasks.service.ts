import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable() //Injectible makes it possible to inject this service into other components(makes it singleton)
export class TasksService {
  private tasks: Task[] = []; //This is a temporary database

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
