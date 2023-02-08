import PropTypes from "prop-types";
import "./Window.css";
import About from "../../pages/Windows/About";
import Notes from "../../pages/Windows/Notes/Notes";
import { useWindow } from "../../contexts/WindowContext";
import AddUser from "../../pages/Windows/Add user/AddUser";
import Music from "../../pages/Windows/Music/Music";

export default function Window({ content, setWindow }) {
  const { showWindow, setShowWindow } = useWindow();
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
        {content === "About" && <About />}
        {content === "Notes" && <Notes content={content} />}
        {content === "Add_user" && <AddUser />}
        {content === "Music" && <Music />}
      </div>
    </>
  );
}

Window.propTypes = {
  content: PropTypes.string.isRequired,
  setWindow: PropTypes.func.isRequired,
};
