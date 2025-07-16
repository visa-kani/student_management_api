const { sign, verify } = require("jsonwebtoken");
const moment = require('moment');

const createTokens = (user, role) => {
  const accessToken = sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: role,
      exp: moment().add(60, 'minutes').unix()
    },
    "student_management"
  );

  const refreshToken = sign(
    { id: user.id },
    "student_management",
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) return res.status(400).json({ error: "User not authenticated!" });

  try {
    const decoded = verify(accessToken, "student_management");
    req.user = decoded;

    const tokenExpiration = moment.unix(decoded.exp);
    const now = moment();

    if (now.isAfter(tokenExpiration)) {
      return res.status(401).json({ error: "Token has expired" });
    }

    req.authenticated = true;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const validateAdmin = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) return res.status(400).json({ error: "User not authenticated!" });

  try {
    const decoded = verify(accessToken, "student_management");
    req.user = decoded;

    const tokenExpiration = moment.unix(decoded.exp);
    const now = moment();

    if (now.isAfter(tokenExpiration)) {
      return res.status(401).json({ error: "Token has expired" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.authenticated = true;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { createTokens, validateToken, validateAdmin };


