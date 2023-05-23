import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserEntity implements User {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    surname!: string;
    @ApiProperty()
    email!: string;
    @ApiProperty()
    password!: string;
    @ApiProperty()
    refreshToken!: string | null;

}