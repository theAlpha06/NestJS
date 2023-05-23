/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto { 
  // Data Transfer Object
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
