import jwt from "jsonwebtoken";
//complicated stuff
const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  console.log("HEADER:", req.headers.authorization);
  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
