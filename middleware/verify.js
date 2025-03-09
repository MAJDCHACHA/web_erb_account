import jwt from "jsonwebtoken";
import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message:messages.Unauthorized });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(statusCodes.FORBIDDEN)
        .json({ message: messages.Forbidden });
    req.user = decoded.UserInfo.id;
    next();
  });
};
export default verify;
