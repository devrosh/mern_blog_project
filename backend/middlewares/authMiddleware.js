const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded?.id);
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.json({ message: "Token expired,please login again" });
    }
  } else {
    res.json({ message: "No token attached" });
  }
};
module.exports = { authMiddleware };
