import { useEffect, useState } from "react";
import user from "../../assets/user2.png";
import navbarItems from "./navbarItems";
import "./Navbar.css";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [timer, setTimer] = useState(0);
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
        className="navbar__avatar"
        role="presentation"
        onClick={() => setShowMenu(!showMenu)}
      >
        <img src={user} alt="user" />
      </div>
      <div>{newDate}</div>
      {showMenu && (
        <div className="navbar__menu">
          {navbarItems.map((el) => (
            <div key={el.id} className="menu__item">
              {el.item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
