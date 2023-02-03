const express = require("express");
const {
  getNotes,
  addNote,
  editNote,
  deleteNote,
} = require("../controllers/notesController");
const authorization = require("../helpers/authentication");

const notesRouter = express.Router();

notesRouter.get("/", authorization, getNotes);
notesRouter.post("/new", authorization, addNote);
notesRouter.put("/:id", authorization, editNote);
notesRouter.delete("/:id", authorization, deleteNote);

module.exports = notesRouter;
