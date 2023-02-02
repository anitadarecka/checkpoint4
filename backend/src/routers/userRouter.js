const express = require("express");
const {
  addUser,
  userLogin,
  userLogout,
  getOneUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const authorization = require("../helpers/authentication");
const checkUsername = require("../middleware/checkUsername");

const userRouter = express.Router();

userRouter.post("/new", checkUsername, addUser);
userRouter.post("/login", userLogin);
userRouter.get("/logout", authorization, userLogout);
userRouter.get("/", getAllUsers);
userRouter.get("/me", authorization, getOneUser);
userRouter.delete("/:id", authorization, deleteUser);

module.exports = userRouter;
