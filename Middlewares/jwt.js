import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token no proporcionado",
      data: {},
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Token inválido",
        data: {},
      });
    }

    req.userId = decoded.userId;
    next();
  });
};

export { verificarToken };
