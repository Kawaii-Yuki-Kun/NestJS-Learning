import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // Decorator that handles the Users route
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    console.log('role', role);
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/inters
  findAllInterns() {
    return this.usersService.findAll('INTERN');
  }

  @Get(':id') // GET /users/:id
  // Reading the id parameter from the URL
  // ParseIntPipe is a built-in pipe that converts the string to a number
  findOne(@Param('id', ParseIntPipe) id: number | string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  // Reading the request body
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  // Reading the request body and the id parameter
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
