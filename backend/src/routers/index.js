const express = require("express");
const notesRouter = require("./notesRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/notes", notesRouter);

module.exports = router;
