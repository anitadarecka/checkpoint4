import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Note from "./Note";

export default function Notes({ content }) {
  const [notesList, setNotesList] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    content: "",
    timestamp: "",
  });
  const writeNote = (e) => {
    const time = new Date();
    setCurrentNote({ content: e.target.value, timestamp: time });
  };
  const getNotes = () => {
    api
      .get("/notes", { withCredentials: true })
      .then((res) => setNotesList(res.data));
  };
  useEffect(() => {
    if (content === "Notes") {
      getNotes();
    }
  }, []);
  const addNote = () => {
    api
      .post("/notes/new", currentNote, {
        withCredentials: true,
      })
      .then((res) => res)
      .then(() => getNotes())
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="notes__input">
        <textarea
          placeholder="You can use this to make some notes, they will appear below..."
          onChange={(e) => writeNote(e)}
          value={currentNote.content}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNote();
              setCurrentNote({ content: "", timestamp: "" });
            }
          }}
        />
      </div>
      <div className="notes__list">
        {notesList &&
          notesList.map((el) => (
            <Note
              id={el.id}
              time={el.timestamp}
              content={el.content}
              getNotes={getNotes}
            />
          ))}
      </div>
    </>
  );
}

Notes.propTypes = {
  content: PropTypes.string.isRequired,
};
