import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDtoApi } from './dto/create-user.dto';
import { UpdateUserDtoApi } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    public create(@Body() createUserDto: CreateUserDtoApi ) {
      return this.usersService.create(createUserDto);
    }
  
    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    public findAll() {
      return this.usersService.findAllUsers();
    }
  
    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    public findOne(@Param('id') id: string) {
      return this.usersService.findJustOne(+id);
    }
  
    @Patch(':id')
    @ApiOkResponse({ type: UserEntity })
    public update(@Param('id') id: string, @Body() updatePrismaDto: UpdateUserDtoApi) {
      return this.usersService.update(+id, updatePrismaDto);
    }
  
    @Delete(':id')
    @ApiOkResponse({ type: UserEntity })
    public remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
}
