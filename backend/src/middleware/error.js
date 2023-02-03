/* eslint-disable no-unused-vars */
const handleErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Oopsie, something went wrong!");
};

module.exports = handleErrorMiddleware;
