/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}