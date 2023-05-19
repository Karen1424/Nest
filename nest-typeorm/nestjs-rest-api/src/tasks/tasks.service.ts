import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        
        const { status, search } = filterDto;
        const query = await this.taskRepository.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });
        let tasks = await this.taskRepository.find();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }

    async getTaskById(id: number): Promise<Task> {

        console.log(1);
        const found = await this.taskRepository.findOneBy({ id });
        console.log(found, 13);
        
        if (! found) {
            throw new NotFoundException();
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

        const { title, description } = createTaskDto;
        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;
        return task;
    }

    async deleteTaskById(id: number): Promise<void> {
       
        const result = await this.taskRepository.delete(id);
        if (0 === result.affected) {
            throw new NotFoundException(`Task with Id: ${id} dose not exists`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save()
        return task;
    }
}
