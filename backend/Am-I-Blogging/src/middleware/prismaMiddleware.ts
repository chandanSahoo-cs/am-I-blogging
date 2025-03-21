import { MiddlewareHandler } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
};

type Variables = {
  prisma: PrismaClient;
};

export const prismaMiddleware: MiddlewareHandler = async (c, next) => {
  if(!c.env.DATABASE_URL){
      return c.text("DATABASE_URL is missing", 500)
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set("prisma", prisma);
    await next();
  } catch (error) {
    c.json({error : "Failed to connect to database"},411);
  }

};
