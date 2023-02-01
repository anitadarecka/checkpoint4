const { jwtVerify } = require("./jwt");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = jwtVerify(token);
    req.userId = data.id;
    req.userEmail = data.email;
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = authorization;
