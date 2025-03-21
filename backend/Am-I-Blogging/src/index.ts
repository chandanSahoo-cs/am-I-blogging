import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { prismaMiddleware } from "./middleware/prismaMiddleware";
import userRouter from "./routes/user.router";
import blogRouter from "./routes/blog.router";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET : string
  };
  Variables: {
    prisma: PrismaClient;
  };
}>();

app.use(prismaMiddleware)
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;
