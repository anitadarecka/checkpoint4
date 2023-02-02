import axios from "axios";

const navbarItems = [
  {
    id: 1,
    item: "About",
    navigate: "",
    permissions: "guest",
  },
  {
    id: 2,
    item: "Settings",
    navigate: "",
    permissions: "admin",
  },
  {
    id: 3,
    item: "Add user",
    navigate: "",
    permissions: "admin",
  },
  {
    id: 4,
    item: "Delete user",
    navigate: "",
    permissions: "guest",
  },
  {
    id: 5,
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

export default navbarItems;
