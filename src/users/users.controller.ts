import { Controller, NotFoundException } from '@nestjs/common';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { UsersService } from './users.service';
import type { User } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { validate } from 'typia';

export interface CreateUserReqBody {
  email: string;
  payload: object;
}

export interface CreateUserResBody {
  user: User;
}

export interface GetUserResBody {
  user: User;
}

type TJsonArr = Array<JsonValue>;
interface IJsonArr extends Array<JsonValue> {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TypedRoute.Post()
  async createUser(
    @TypedBody() form: CreateUserReqBody,
  ): Promise<CreateUserResBody> {
    const { email, payload } = form;
    const user = await this.usersService.create({
      email: Date.now() + email,
      payload,
    });
    return { user };
  }

  @TypedRoute.Get(':id')
  async getUser(
    @TypedParam('id') id: number,
  ): Promise<GetUserResBody> {
    const user = await this.usersService.getUserById(id);
    if (user === null) throw new NotFoundException();

    const position = (user.payload as any).camera.position;

    let a: IJsonArr;
    console.log('User::', validate<TJsonArr>(position));
    console.log('User::', validate<IJsonArr>(position));
    return { user };
  }
}
