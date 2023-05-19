import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTaskById(id: number): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
