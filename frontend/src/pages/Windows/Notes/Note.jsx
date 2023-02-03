import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";

export default function Note({ id, time, content, getNotes }) {
  const deleteNote = () => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}`, {
        withCredentials: true,
      })
      .then((res) => res)
      .then(() => getNotes())
      .catch((err) => console.error(err));
  };
  const [currentNote, setCurrentNote] = useState({
    content,
    timestamp: "",
  });
  const [editMode, setEditMode] = useState(false);
  const editNote = () => {
    axios
      .put(`http://localhost:8000/api/notes/${id}`, currentNote, {
        withCredentials: true,
      })
      .then((res) => res)
      .then(() => setEditMode(false))
      .then(() => getNotes())
      .catch((err) => console.error(err));
  };
  const writeNote = (e) => {
    const newTime = new Date();
    setCurrentNote({ content: e.target.value, timestamp: newTime });
  };
  const options = {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const timestamp = new Date(time).toLocaleString("en-US", options);
  return (
    <div className="note__item">
      {editMode ? (
        <textarea
          onChange={(e) => writeNote(e)}
          value={currentNote.content}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editNote();
            }
          }}
        >
          {content}
        </textarea>
      ) : (
        <div className="note__content">‣ {content}</div>
      )}
      <div className="note__timestamp">{timestamp}</div>
      <div className="note__delete" role="presentation" onClick={deleteNote}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
      <div
        className="note__edit"
        role="presentation"
        onClick={() => setEditMode(!editMode)}
      >
        <FontAwesomeIcon icon={faPen} />
      </div>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  getNotes: PropTypes.func.isRequired,
};
