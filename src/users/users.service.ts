import { Injectable} from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  createUser(userData: Omit<User, 'id'>): User {
    const newUser: User = { id: this.idCounter++, ...userData };
    this.users.push(newUser);
    return newUser;
  }

  loginUser(userData: Omit<User, 'id'>): User | undefined {
    return this.users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password,
    );
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async updateUser(
    id: number,
    userData: Partial<Omit<User, 'id'>>,
  ): Promise<User | undefined> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  async deleteUserById(id: number): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }
}