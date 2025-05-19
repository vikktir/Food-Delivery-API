import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/users.entity';
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly authService: AuthService,
              ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(
    @Body() userData: Omit<User, 'id'>,
  ): Promise<{ user?: User; message: string }> {
    try {
      const user = await this.usersService.createUser(userData);
      return { user, message: 'Successful registration' };
    } catch {
      return { message: 'Registration failed' };
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async loginUser(@Body() data: { email: string; password: string }) {
    const user = await this.usersService.loginUser(data.email, data.password);
    if (!user) return { message: 'Invalid credentials' };
    return this.authService.login(user);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    const user = await this.usersService.updateUser(id, data);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deletedUser = await this.usersService.deleteUserById(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
