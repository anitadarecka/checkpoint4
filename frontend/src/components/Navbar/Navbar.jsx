import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import user from "../../assets/user2.png";
import battery from "../../assets/battery.png";
import "./Navbar.css";
import NavbarMenu from "./NavbarMenu";

export default function Navbar({ me, setShowPopup }) {
  const [showMenu, setShowMenu] = useState(false);
  const [timer, setTimer] = useState(0);
  const { setUser } = useAuth();

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  const newDate = new Date().toLocaleString("en-US", options);
  useEffect(() => {
    setInterval(() => {
      setTimer((minutes) => minutes + 1);
    }, 60000);
  }, [timer]);
  return (
    <div className="home__navbar">
      <div className="navbar__left">
        <div
          className="navbar__user"
          role="presentation"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={user} alt="user" /> {me.firstname}
        </div>
      </div>
      <div className="navbar__right">
        <img src={battery} alt="battery" />
        {newDate}
      </div>
      {showMenu && (
        <div className="navbar__menu">
          <NavbarMenu
            me={me}
            setUser={setUser}
            setShowPopup={setShowPopup}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      )}
    </div>
  );
}

Navbar.propTypes = {
  me: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setShowPopup: PropTypes.func.isRequired,
};
