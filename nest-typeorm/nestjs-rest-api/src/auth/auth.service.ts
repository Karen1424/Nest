import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Auth, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentions.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) {
        
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        
        try {
            await user.save();
        } catch (error) {
            if ("ER_DUP_ENTRY" === error.code) {
                throw new ConflictException('Username already exists.');
            }
            throw new InternalServerErrorException();
        }   
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise< { accsessToken: string } > {
       
        const username = await this.validateUserPassword(authCredentialsDto);   
        if (! username) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const paylodad: JwtPayload = { username };
        const accsessToken = await this.jwtService.sign(paylodad);
        return { accsessToken };
    }

    private async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {

        const { username, password } = authCredentialsDto;
        const user = await this.authRepository.findOneBy({ username });
        if (user && await user.validataPassword(password)) {
            return user.username;
        }
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {

        return bcrypt.hash(password, salt);
    }
}
