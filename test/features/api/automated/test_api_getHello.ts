import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";

export const test_api_getHello = async (
    connection: api.IConnection
): Promise<void> => {
    const output: Primitive<string> = await api.functional.getHello(
        connection,
    );
    typia.assert(output);
};