import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentions.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    singIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accsessToken: string;
    }>;
}
