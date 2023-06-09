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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const user = new user_entity_1.User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        try {
            await user.save();
        }
        catch (error) {
            if ("ER_DUP_ENTRY" === error.code) {
                throw new common_1.ConflictException('Username already exists.');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async signIn(authCredentialsDto) {
        const username = await this.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const paylodad = { username };
        const accsessToken = await this.jwtService.sign(paylodad);
        return { accsessToken };
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.authRepository.findOneBy({ username });
        if (user && await user.validataPassword(password)) {
            return user.username;
        }
        return null;
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map