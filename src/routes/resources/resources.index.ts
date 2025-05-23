import { createRouter } from "@/lib/create-app";

import * as handlers from "./resources.handlers";
import * as routes from "./resources.routes";

const router = createRouter()
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.publish, handlers.publish)
  .openapi(routes.getUsersResources, handlers.getUsersResources)
  .openapi(routes.upvote, handlers.upvote)
  .openapi(routes.upvoteQueue, handlers.upvoteQueue)
  .openapi(routes.addOrRemoveBookmark, handlers.addOrRemoveBookmark)
  .openapi(routes.userBookmarks, handlers.userBookmarks)
  .openapi(routes.publishJob, handlers.publishJob)
  .openapi(routes.search, handlers.search);

export default router;
