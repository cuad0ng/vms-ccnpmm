const userRouter = require("./user");
const videoRouter = require("./video")
const imageRouter = require("./image")

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/video", videoRouter);
  app.use("/api/image", imageRouter);
}

module.exports = route;
