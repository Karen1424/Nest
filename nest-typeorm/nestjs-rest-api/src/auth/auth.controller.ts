import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentions.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {

        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise< { accsessToken: string } > {

        return this.authService.signIn(authCredentialsDto);
    }
}
