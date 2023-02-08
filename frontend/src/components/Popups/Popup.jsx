import PropTypes from "prop-types";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import "./Popup.css";

export default function Popup({ content, setShowPopup, role, id }) {
  const { setUser } = useAuth();
  const handleDelete = () => {
    api
      .get("/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        window.localStorage.removeItem("user");
      })
      .then(() => {
        api.delete(`/users/${id}`).then((res) => res);
      })
      .then(() => setUser({ data: null }))
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="window__navbar">
        {content}{" "}
        <div
          className="window__buttons"
          role="presentation"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </div>
      </div>
      <div className="window__content">
        {role === "admin" ? (
          <p>YOU CANNOT DELETE THE ADMIN!</p>
        ) : (
          <>
            <p>Are you really sure?</p>
            <div className="popup__buttons">
              <button type="button" onClick={handleDelete}>
                YOLO!
              </button>
              <button type="button" onClick={() => setShowPopup(false)}>
                No...
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

Popup.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};
