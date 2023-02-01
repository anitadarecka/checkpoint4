import PropTypes from "prop-types";
import "./Window.css";

export default function Window({ content }) {
  return (
    <>
      <div className="window__navbar">{content}</div>
      Window
    </>
  );
}

Window.propTypes = {
  content: PropTypes.string.isRequired,
};
