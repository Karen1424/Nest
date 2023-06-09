import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { Repository } from "typeorm";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: Repository<User>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
