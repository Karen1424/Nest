import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentions.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authRepository;
    private jwtService;
    constructor(authRepository: Repository<User>, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accsessToken: string;
    }>;
    private validateUserPassword;
    private hashPassword;
}
