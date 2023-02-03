import { useState } from "react";
import axios from "axios";
import "./AddUser.css";
import { useWindow } from "../../../contexts/WindowContext";

export default function AddUser() {
  const { setShowWindow, showWindow } = useWindow();
  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/api/users/new", newUser)
      .then((res) => res)
      .catch((err) => console.error(err));
    setShowWindow({
      ...showWindow,
      Add_user: { show: false },
    });
  };
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="adduser__inputs">
        <div className="adduser__input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
          />
        </div>
        <div className="adduser__input">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            name="firstname"
            value={newUser.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="adduser__input">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="adduser__input">
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add user</button>
      </div>
    </form>
  );
}
