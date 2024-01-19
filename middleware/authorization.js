const jwt = require("jsonwebtoken");

//after sign in
const authorize = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header || !header.startsWith('Bearer ')) {
      req.user = null;
      return res.status(401).json({ error: "Unauthorized." });
    }
    const token = header.split(" ")[1];
    const user = jwt.verify(token, process.env["JWT_SECRET"]);
    next();
  } catch (error) {
    req.user = null;
    return res.status(401).json({ error: "Unauthorized...." });
  }
};

module.exports = authorize;
