import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {

  async findOne(username: string): Promise<any | undefined> {
    const users = [
      {
        userId: 1,
        username: 'john',
        password: await argon2.hash('guess'),
      },
      {
        userId: 2,
        username: 'maria',
        password: await argon2.hash('guess'),
      },
    ];

    return users.find(user => user.username === username);
  }
}