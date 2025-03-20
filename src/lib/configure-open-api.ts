import { AppOpenAPI } from "./types";
import packageJson from "../../package.json";
export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Hono",
      version: packageJson.version,
      description: "Hono API",
    },
  });
}
