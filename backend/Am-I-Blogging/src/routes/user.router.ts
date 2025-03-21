import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, SigninInput, signupInput } from "@chandansahoo/am-i-blogging";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();

  const {success} = signupInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs are incorrect"
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    console.log(user.id);
    console.log(c.env.JWT_SECRET);
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    console.log(jwt);
    if (!user) throw new Error("Failed to create user");

    return c.json({ user, jwt });
  } catch (e) {
    console.error("Signup error:", e);
    return c.json({ error: e }, 400);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs are incorrect"
    })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign(
      {
        id: user?.id,
      },
      c.env.JWT_SECRET
    );

    console.log(jwt);
    if (!user) throw new Error("Failed to create user");

    return c.json({ user, jwt });
  } catch (e) {
    console.error("Signin error:", e);
    return c.json({ error: e }, 400);
  }
});

export default userRouter;
