import { pinoLogger } from "@/middlewares/pino-logger";
import { notFound, onError } from "stoker/middlewares";
import { AppBindings } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "stoker/openapi";
import { cors } from "hono/cors";
import { initAuth } from "./auth";
export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createRouter();
  app.use(
    "*",
    cors({
      origin: "http://localhost:3000",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );

  app.use("*", async (c, next) => {
    const auth = initAuth(c.env);
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  });

  app.notFound(notFound);
  app.onError(onError);
  app.use(pinoLogger());
  return app;
}
