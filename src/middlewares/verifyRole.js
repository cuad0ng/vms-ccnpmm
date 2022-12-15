import { notAuth } from "./handleError";

const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "AD") return notAuth("Require role Admin", res);
  next();
};

export default isAdmin;