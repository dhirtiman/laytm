// user middleware
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (header.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET);
      req.userid = decoded.userid;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  }
};

export { auth };
