import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign } from "hono/jwt";
import { Hono } from "hono";

export const  userRouter =new Hono<{
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
  
      if (!body.name || !body.email || !body.password) {
        return c.json({ msg: "Invalid input data" }, 400);
      }
  
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
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
  
      if (!body.email || !body.password) {
        return c.json({ msg: "Invalid input data" }, 400);
      }
  
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
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

