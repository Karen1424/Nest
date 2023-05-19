import { TaskStatus } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    status: TaskStatus;
    tasks: Task[];
    validataPassword(password: string): Promise<boolean>;
}
