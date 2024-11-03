import z from "zod";

const signupInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
});

const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type SignupTypet = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
