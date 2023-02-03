import PropTypes from "prop-types";
import axios from "axios";
import { useWindow } from "../../contexts/WindowContext";

export default function NavbarMenu({ me, setUser, setShowPopup }) {
  const { setShowWindow, showWindow } = useWindow();
  const navbarItems = [
    {
      id: 1,
      item: "About",
      navigate: "",
      permissions: "guest",
    },
    {
      id: 2,
      item: "Edit_user",
      navigate: "",
      permissions: "guest",
    },
    {
      id: 4,
      item: "Add_user",
      navigate: "",
      permissions: "admin",
      handle: () =>
        setShowWindow({
          ...showWindow,
          Add_user: { show: true },
        }),
    },
    {
      id: 5,
      item: "Delete_user",
      navigate: "",
      permissions: "guest",
      handle: () => {
        setShowPopup(true);
      },
    },
    {
      id: 3,
      item: "Settings",
      navigate: "",
      permissions: "admin",
    },
    {
      id: 6,
      item: "Logout",
      navigate: "/",
      permissions: "guest",
      handle: () => {
        axios
          .get("http://localhost:8000/api/users/logout", {
            withCredentials: true,
          })
          .then(() => {
            window.localStorage.removeItem("user");
          });
      },
    },
  ];
  const handle = (item, action) => {
    action();
    if (item === "Logout") {
      setUser({ data: null });
    }
  };
  return (
    <div>
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
  );
}

NavbarMenu.propTypes = {
  me: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};
