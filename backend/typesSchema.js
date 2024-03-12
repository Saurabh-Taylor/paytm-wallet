import zod from "zod";

export const userSchema =zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
}) 
