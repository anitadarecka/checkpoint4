const notesModel = require("../models/notes");

const notesController = {
  getNotes: (req, res, next) => {
    const id = req.userId;
    notesModel
      .getNotes(id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => next(err));
  },
  addNote: (req, res, next) => {
    const noteData = req.body;
    const id = req.userId;
    notesModel
      .addNote({ ...noteData, user_id: id })
      .then(() => {
        res.status(201).send("Note added!");
      })
      .catch((err) => next(err));
  },
  editNote: (req, res, next) => {
    const { id } = req.params;
    notesModel
      .editNote(id)
      .then((result) => res.status(200).send(result))
      .catch((err) => next(err));
  },
  deleteNote: (req, res, next) => {
    const { id } = req.params;
    notesModel
      .deleteNote(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          res.status(404).send("Note does not exist.");
        } else {
          res.status(200).send("Note deleted.");
        }
      })
      .catch((err) => next(err));
  },
};

module.exports = notesController;
