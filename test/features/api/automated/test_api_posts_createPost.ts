import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";
import type { CreatePostReqBody, CreatePostResBody } from "../../../../src/posts/posts.controller";

export const test_api_posts_createPost = async (
    connection: api.IConnection
): Promise<void> => {
    const output: Primitive<CreatePostResBody> = await api.functional.posts.createPost(
        connection,
        typia.random<Primitive<CreatePostReqBody>>(),
    );
    typia.assert(output);
};