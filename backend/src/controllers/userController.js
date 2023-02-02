const userModel = require("../models/user");
const { passwordHash, passwordVerify } = require("../helpers/password");
const { jwtSign } = require("../helpers/jwt");

const userController = {
  addUser: async (req, res, next) => {
    const userData = req.body;
    try {
      const hash = await passwordHash(userData.password);

      userModel
        .createUser({ ...userData, password: hash, role_id: 2 })
        .then((result) => {
          res.status(201).send({
            id: result.insertId,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  },
  getAllUsers: (req, res, next) => {
    userModel
      .findAllUsers()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => next(err));
  },
  getOneUser: (req, res, next) => {
    const id = req.userId;
    userModel
      .findUserById(id)
      .then((result) => {
        if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      })
      .catch((err) => next(err));
  },

  userLogin: (req, res, next) => {
    const { username, password } = req.body;
    userModel
      .findUserByUsername(username)
      .then(async ([user]) => {
        if (!user) {
          res.status(401).send({ error: "Invalid username." });
        } else {
          const { id, firstname, lastname, password: hash } = user;
          if (await passwordVerify(hash, password)) {
            const token = jwtSign(
              {
                id,
                firstname,
                lastname,
              },
              {
                expiresIn: "1h",
              }
            );
            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: false,
              })
              .status(200)
              .send({ id, username, firstname, lastname, msg: "Welcome!" });
          } else {
            res.status(401).send({ error: "Wrong password!" });
          }
        }
      })
      .catch((err) => next(err));
  },
  userLogout: (_, res) => {
    return res.clearCookie("access_token").sendStatus(200);
  },
  deleteUser: (req, res, next) => {
    const { id } = req.params;
    userModel
      .deleteUser(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          res.status(404).send("User not found");
        } else {
          res.status(200).send("User deleted.");
        }
      })
      .catch((err) => next(err));
  },
};

module.exports = userController;
