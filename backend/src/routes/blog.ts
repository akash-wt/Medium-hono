import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { Hono } from "hono";
import { z } from "zod";
import { createBlogInput, updateBlogInput } from "@akash-wt/medium-types";

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
    const response = createBlogInput.safeParse(body);

    if (!response.success) {
      return c.json(
        {
          msg: "Invalid input",
          errors: response.error.errors,
        },
        400
      );
    }
    const newBlog = await prisma.post.create({
      data: {
        title: response.data.title,
        content: response.data.content,
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

blogRouter.put("/:id", async (c) => {
  try {
    const postId = c.req.param("id");
    console.log(postId);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const response = updateBlogInput.safeParse(body);

    if (!response.success) {
      return c.json(
        {
          msg: "Invalid input",
          errors: response.error.errors,
        },
        400
      );
    }
    const updatedBlog = await prisma.post.update({
      where: {
        id: postId,
      },

      data: {
        title: response.data.title,
        content: response.data.content,
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

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    // const bulkBlog = await prisma.user.findUnique({
    //      where:{
    //       id: userId
    //      },
    //     include:{
    //       posts: true
    //     }
    // });

    const bulkBlog = await prisma.post.findMany();

    console.log(bulkBlog);

    return c.json({
      blogs: bulkBlog,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const postId = c.req.param("id");
    console.log(postId);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const Blog = await prisma.post.findUnique({
      where: {
        id: postId,
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
