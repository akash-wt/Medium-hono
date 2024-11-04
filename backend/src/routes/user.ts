import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import { z } from "zod";
import { signinInput, signupInput } from "@akash-wt/medium-types";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = signupInput.safeParse(body);

    if (!response.success) {
      return c.json(
        {
          msg: "Invalid input",
          errors: response.error.errors,
        },
        400
      );
    }

    const user = await prisma.user.create({
      data: {
        name: response.data.name,
        email: response.data.email,
        password: response.data.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(token);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.json(
      {
        msg: "error while signup",
        error: e,
      },
      403
    );
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const response = signinInput.safeParse(body);
    if (!response.success) {
      return c.json(
        {
          msg: "Invalid input",
          errors: response.error.errors,
        },
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: response.data.email,
        password: response.data.password,
      },
    });

    if (!user) {
      return c.json({
        msg: "user not exist",
      });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.json(
      {
        msg: "error while signin",
        error: e,
      },
      403
    );
  }
});
