import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
export declare class TasksController {
    private taskService;
    constructor(taskService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTaskById(id: number): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
