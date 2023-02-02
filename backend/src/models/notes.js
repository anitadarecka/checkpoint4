const db = require("../../config");

const addNote = (payload) => {
  return db
    .promise()
    .query("INSERT INTO notes SET ?", [payload])
    .then(([res]) => res);
};
const getNotes = (id) => {
  return db
    .promise()
    .query(
      "SELECT n.content, n.timestamp from notes as n join user as u on u.id = n.user_id where u.id = ?",
      [Number(id)]
    )
    .then(([res]) => res);
};

const editNote = (payload, id) => {
  return db
    .promise()
    .query("UPDATE notes SET ? where id = ?", [payload, Number(id)])
    .then(([res]) => res);
};

const deleteNote = (id) => {
  return db
    .promise()
    .query("DELETE FROM notes WHERE id = ?", [Number(id)])
    .then(([res]) => res);
};

module.exports = { addNote, getNotes, editNote, deleteNote };
