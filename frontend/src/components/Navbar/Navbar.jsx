import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import user from "../../assets/user2.png";
import navbarItems from "./navbarItems";
import "./Navbar.css";

export default function Navbar({ me }) {
  const [showMenu, setShowMenu] = useState(false);
  const [timer, setTimer] = useState(0);
  const { setUser } = useAuth();
  const handle = (item, action) => {
    action();
    if (item === "Logout") {
      setUser({ data: null });
    }
  };
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
      <div
        className="navbar__user"
        role="presentation"
        onClick={() => setShowMenu(!showMenu)}
      >
        <img src={user} alt="user" /> {me.firstname}
      </div>
      <div>{newDate}</div>
      {showMenu && (
        <div className="navbar__menu">
          {navbarItems
            .filter((el) => me.role === "admin" || el.permissions === me.role)
            .map((el) => (
              <div
                key={el.id}
                role="presentation"
                className="menu__item"
                onClick={() => handle(el.item, el.handle)}
              >
                {el.item}
              </div>
            ))}
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
};
