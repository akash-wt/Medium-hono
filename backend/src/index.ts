import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || " ";
    const token=authHeader.split(" ")[1]; 
    const isVerified = await verify(token, c.env.JWT_SECRET);
    if (isVerified) {
      await next();
    } else {
      throw Error;
    }
  } catch (e) {
    return c.json({
      msg: "unauthorized, verfication failed!",
      error: e,
    },401);
  }
});

app.post("/api/v1/signup", async (c) => {
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

app.post("/api/v1/user/signin", async (c) => {
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

app.post("/api/v1/blog", (c) => {
  const id = c.req.param;
  console.log(id);

  return c.json({
    message: "post blog",
    id: `${id}`,
  });
});

app.put("/api/v1/blog/:id", (c) => {
  return c.text("put blog");
});

app.delete("/api/v1/blog/bulk", (c) => {
  return c.text("delete blog");
});

export default app;
