import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "You must log in",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }


    if (!payload || !payload.id) {
      return res.status(401).json({
        success: false,
        error: "Invalid token payload",
      });
    }

    const { id } = payload;
    try {
      req.userId = id;
      next();
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  });
};
