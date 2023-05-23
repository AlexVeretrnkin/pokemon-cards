import { User } from '@prisma/client';
export class CreateUserDto implements Omit<User, 'id' | 'refreshToken'> {
    name!: string;
    surname!: string;
    email!: string;
    password!: string;
}