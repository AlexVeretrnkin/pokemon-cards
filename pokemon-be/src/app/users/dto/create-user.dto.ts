import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@pokemon-cards/shared/dto';

export class CreateUserDtoApi implements CreateUserDto {
    @ApiProperty()
    public name!: string;
    @ApiProperty()
    public surname!: string;
    @ApiProperty()
    public email!: string;
    @ApiProperty()
    public password!: string;
}