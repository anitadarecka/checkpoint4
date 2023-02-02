import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Window.css";
import Note from "./Note";
import { useWindow } from "../../contexts/WindowContext";

export default function Window({ content, setWindow }) {
  const { showWindow, setShowWindow } = useWindow();
  const [currentNote, setCurrentNote] = useState({
    content: "",
    timestamp: "",
  });
  const [notesList, setNotesList] = useState([]);
  const writeNote = (e) => {
    const time = new Date();
    setCurrentNote({ content: e.target.value, timestamp: time });
  };
  const getNotes = () => {
    axios
      .get("http://localhost:8000/api/notes", { withCredentials: true })
      .then((res) => setNotesList(res.data));
  };
  useEffect(() => {
    if (content === "Notes") {
      getNotes();
    }
  }, []);
  const addNote = () => {
    axios
      .post("http://localhost:8000/api/notes/new", currentNote, {
        withCredentials: true,
      })
      .then((res) => res)
      .then(() => getNotes())
      .catch((err) => console.error(err));
  };
  const handleClose = () => {
    setShowWindow({
      ...showWindow,
      [content]: { show: false },
    });
    setWindow((previous) => ({
      ...previous,
      show: false,
    }));
  };
  return (
    <>
      <div className="window__navbar">
        {content}
        <div
          className="window__buttons"
          role="presentation"
          onClick={handleClose}
        >
          ✕
        </div>
      </div>
      <div className="window__content">
        {content === "About" && (
          <div>
            Hello. Welcome to "My Computer". A little project I made for
            Checkpoint 4 at the Wild Code School. It is still in progress.
            Please be patient and come back soon :)
          </div>
        )}
        {content === "Notes" && (
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
        )}
      </div>
    </>
  );
}

Window.propTypes = {
  content: PropTypes.string.isRequired,
  setWindow: PropTypes.func.isRequired,
};
