import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || " ";
    const token = authHeader.split(" ")[1];
    interface typeuser {
      id: string;
    }
    const user = await verify(token, c.env.JWT_SECRET);
    if (user && user.id) {
      // @ts-ignore
      c.set("userId", user.id);
      console.log(user.id);

      await next();
    } else {
      throw Error;
    }
  } catch (e) {
    return c.json(
      {
        msg: "unauthorized, verfication failed!",
        error: e,
      },
      401
    );
  }
});

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get("userId");

    const newBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    console.log(newBlog);

    return c.json({
      msg: " blog created!",
      blog: newBlog,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});



blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get("userId");
    const updatedBlog = await prisma.post.update({
      where: {
        id: userId,
      },

      data: {
        title: body.title,
        content: body.content,
      },
    });
    console.log(updatedBlog);

    return c.json({
      msg: " blog updated!",
      blog: updatedBlog,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

blogRouter.get("/get", async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const userId = c.get("userId");
      const Blog = await prisma.post.findUnique({
        where: {
          id: userId,
        },
      });
  
      return c.json({
        blog: Blog,
      });
    } catch (e) {
      return c.json({
        error: e,
      });
    }
  });

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    const bulkBlog = await prisma.post.findMany({
        where:{
            authorId:userId
        }
    });

    return c.json({
      blogs: bulkBlog,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});
