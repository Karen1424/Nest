"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("../task-status.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isValidStatus(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }
    isValidStatus(status) {
        const index = this.allowedStatuses.indexOf(status);
        return -1 !== index;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map