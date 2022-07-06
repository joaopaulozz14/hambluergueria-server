import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entities';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  //O private não permite usar o usersService fora dessa atual classe(UsersController);
  //Readonly; esse constructor nunca vai ser sobescrito;
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuários',
  })
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista usuário por Id',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário',
  })
  create(@Body() dto: CreateUserDto): Promise<User | void> {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete um usuário',
  })
  delete(@Param('id') id: string) {
    this.usersService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'atualizar um usuário',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.update(id, dto);
  }
}
