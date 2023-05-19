"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTasks(filterDto) {
        const { status, search } = filterDto;
        let tasks = await this.taskRepository.find();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
    async getTaskById(id) {
        console.log(1);
        const found = await this.taskRepository.findOneBy({ id });
        console.log(found, 13);
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = new task_entity_1.Task();
        task.description = description;
        task.title = title;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
    async deleteTaskById(id) {
        const result = await this.taskRepository.delete(id);
        if (0 === result.affected) {
            throw new common_1.NotFoundException(`Task with Id: ${id} dose not exists`);
        }
    }
    async updateTaskStatus(id, status) {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map