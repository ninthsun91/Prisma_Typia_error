import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";
import type { CreateUserReqBody, CreateUserResBody } from "../../../../src/users/users.controller";

export const test_api_users_createUser = async (
    connection: api.IConnection
): Promise<void> => {
    const output: Primitive<CreateUserResBody> = await api.functional.users.createUser(
        connection,
        typia.random<Primitive<CreateUserReqBody>>(),
    );
    typia.assert(output);
};