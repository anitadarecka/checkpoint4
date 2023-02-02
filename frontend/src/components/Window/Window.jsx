import PropTypes from "prop-types";
import "./Window.css";

export default function Window({ content, setWindow }) {
  const handleClose = () => {
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
              <textarea placeholder="You can use this to make some notes, they will appear below..." />
            </div>
            <div className="notes__list">List of notes</div>
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
