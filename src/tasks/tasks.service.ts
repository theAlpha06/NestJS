import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable() //Injectible makes it possible to inject this service into other components(makes it singleton)
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }
  // private tasks: Task[] = []; This is a temporary database
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   //define a temp array to hold the result
  //   let tasks = this.getAllTasks();
  //   //do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   //do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   //return result
  //   return tasks;
  // }
  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const { title, description } = createTaskDto;
  //   const task = this.tasksRepository.create({
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   });
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => {
  //     task.id !== found.id;
  //   });
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task[] {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return this.tasks;
  // }
}
