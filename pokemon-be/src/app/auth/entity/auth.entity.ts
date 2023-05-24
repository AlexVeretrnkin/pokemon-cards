import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
    @ApiProperty()
    public accessToken!: string;
    @ApiProperty()
    public refreshToken!: string;
}