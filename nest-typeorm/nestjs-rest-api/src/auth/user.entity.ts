import * as bcrypt from 'bcrypt';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    status: TaskStatus;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    async validataPassword(password: string): Promise<boolean> {

        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}