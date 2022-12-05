import { notFound } from "../middlewares/handleError";
const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("../config/swagger.json");
import userRouter from "./user";
import videoRouter from "./video";
import imageRouter from "./image";
import authRouter from "./auth";
function route(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/video", videoRouter);
  app.use("/api/v1/image", imageRouter);
  app.use("/api/v1/auth", authRouter);

  app.use(notFound);
}

module.exports = route;
