import { Controller, NotFoundException } from '@nestjs/common';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { validate } from 'typia';
import { UsersService } from './users.service';
import type { User } from '@prisma/client';
import type Prisma from '@prisma/client/runtime/library';

import { z } from 'zod';

const JsonValue: z.ZodTypeAny = z.lazy(() => 
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    JsonObject,
    JsonArray,
    z.null()
  ])
);
type JsonValue = z.infer<typeof JsonValue>;

const jsonObjectValue: JsonValue = {
  key1: "value1",
  key2: 10,
  key3: false,
  key4: null,
  key5: {
    nestedKey: "nestedValue"
  },
  key6: [1, "two", null]
};

const JsonObject = z.record(JsonValue);
const JsonArray = z.array(JsonValue);

const isValidJsonValue = (value: unknown): value is Prisma.JsonValue => {
  return JsonValue.safeParse(value).success;
}

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

type TJsonArray = Array<Prisma.JsonValue>;
interface IJsonArray extends Array<Prisma.JsonValue> {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log('zod::', JsonValue.safeParse(jsonObjectValue.key6));
    console.log('typia::', validate<Prisma.JsonValue>(jsonObjectValue.key6));
    console.log('Array<JsonValue>::', validate<TJsonArray>(jsonObjectValue.key6));
  }

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

    console.log('User::', user);
    console.log('TJsonArray::', validate<TJsonArray>(position));
    console.log('IJsonArray::', validate<IJsonArray>(position));
    console.log('Prisma.JsonArray::', validate<Prisma.JsonArray>(position));
    console.log('zod::', isValidJsonValue(user.payload));
    console.log('zod::', isValidJsonValue(position));
    return { user };
  }
}
