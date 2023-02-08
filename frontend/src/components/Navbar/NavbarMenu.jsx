import PropTypes from "prop-types";
import api from "../../services/api";
import { useWindow } from "../../contexts/WindowContext";

export default function NavbarMenu({
  me,
  setUser,
  setShowPopup,
  showMenu,
  setShowMenu,
}) {
  const { setShowWindow, showWindow } = useWindow();
  const navbarItems = [
    {
      id: 1,
      item: "About",
      title: "About",
      navigate: "",
      permissions: "guest",
      handle: () => {
        setShowWindow({
          ...showWindow,
          About: { show: true },
        });
        setShowMenu(!showMenu);
      },
    },
    {
      id: 2,
      item: "Edit_user",
      title: "Edit user",
      navigate: "",
      permissions: "guest",
    },
    {
      id: 4,
      item: "Add_user",
      title: "Add user",
      navigate: "",
      permissions: "admin",
      handle: () => {
        setShowWindow({
          ...showWindow,
          Add_user: { show: true },
        });
        setShowMenu(!showMenu);
      },
    },
    {
      id: 5,
      item: "Delete_user",
      title: "Delete user",
      navigate: "",
      permissions: "guest",
      handle: () => {
        setShowPopup(true);
        setShowMenu(!showMenu);
      },
    },
    {
      id: 3,
      item: "Settings",
      title: "Settings",
      navigate: "",
      permissions: "admin",
    },
    {
      id: 6,
      item: "Logout",
      title: "Logout",
      navigate: "/",
      permissions: "guest",
      handle: () => {
        api
          .get("/users/logout", {
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
            {el.title}
          </div>
        ))}
    </div>
  );
}

NavbarMenu.propTypes = {
  me: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  setShowMenu: PropTypes.func.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
};
