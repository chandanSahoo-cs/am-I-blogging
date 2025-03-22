import { PrismaClient } from "@prisma/client/edge";
import { Param } from "@prisma/client/runtime/library";
import { Hono } from "hono";
import { verify } from "hono/jwt";

import {
  createBlog,
  CreateBlog,
  updateBlog,
} from "@chandansahoo/am-i-blogging";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
    userId: string;
  };
}>();

export default blogRouter;

blogRouter.use(async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user?.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/create", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();

  const { success } = createBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are incorrect",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        authorId: c.get("userId"),
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ post });
  } catch (error) {
    c.status(411);
    return c.json({ error: error }, 411);
  }
});

blogRouter.put("/update", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();

  const { success } = updateBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are incorrect",
    });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        authorId: c.get("userId"),
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ post });
  } catch (error) {
    c.status(411);
    return c.json({ error: error }, 411);
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = c.get("prisma");
  const id = c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include : {
        author : {
          select : {
            name : true
          }
        }
      }
    });

    return c.json({ post });
  } catch (error) {
    c.status(411);
    return c.json({ error: error }, 411);
  }
});

blogRouter.get("/entries/bulk", async (c) => {
  const prisma = c.get("prisma");
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(posts);
    return c.json({ posts });
  } catch (error) {
    c.status(411);
    return c.json({ error: error }, 411);
  }
});
