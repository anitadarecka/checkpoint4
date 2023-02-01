const userModel = require("../models/user");

const checkUsername = (req, res, next) => {
  const { username } = req.body;
  userModel
    .findUserByUsername(username)
    .then(([user]) => {
      if (user) {
        return res
          .status(404)
          .send("Username already in use, pick a different one!");
      }
      return next();
    })
    .catch((err) => next(err));
};

module.exports = checkUsername;
