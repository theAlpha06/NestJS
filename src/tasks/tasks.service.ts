import { Injectable } from '@nestjs/common';

@Injectable() //Injectible makes it possible to inject this service into other components(makes it singleton)
export class TasksService {
  private tasks = []; //This is a temporary database

  getAllTasks() {
    return this.tasks;
  }
}
