/* eslint-disable prettier/prettier */
import { TaskStatus } from "../task-status.enum";
import { IsEnum } from "class-validator";

export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}