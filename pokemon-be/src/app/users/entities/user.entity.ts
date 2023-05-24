import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserEntity implements Omit<User, 'password' | 'refreshToken'> {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    surname!: string;
    @ApiProperty()
    email!: string;
}