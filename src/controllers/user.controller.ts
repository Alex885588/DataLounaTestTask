import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/models/user';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto.fullName, createUserDto.balance);
    }
}
