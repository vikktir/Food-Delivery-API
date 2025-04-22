import { Body, Param, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() userData: Omit<User, 'id'>,
  ): Promise<{ user?: User; message: string }> {
    try {
      const user = this.usersService.createUser(userData);
      return { user, message: 'successful registration' };
    } catch {
      return { message: 'unsuccessful registration' };
    }
  }

  @Post('login')
  async loginUser(
    @Body() userData: Omit<User, 'id'>,
  ): Promise<{ user?: User | undefined; message: string }> {
    const user = this.usersService.loginUser(userData);
    if (user) {
      return { user, message: 'successful login' };
    }
    return { user, message: 'login failed' };
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.getUserById(Number(id));
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<Omit<User, 'id'>>,
  ): Promise<User | undefined> {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<{ user?: User | null; message: string }> {
    const deletedUser = await this.usersService.deleteUserById(Number(id));
    if (!deletedUser) {
      return { user: null, message: "user not found" };
    }
    return { user: deletedUser, message: "user successfully deleted" };

  }
}
