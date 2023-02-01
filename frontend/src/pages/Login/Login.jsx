import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowAltCircleLeft,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import User from "../../components/User";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({ username: "", password: "" });
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/")
      .then((res) => setUsers(res.data));
  }, []);
  const handleLogin = () => {
    axios
      .post("http://localhost:8000/api/users/login", payload)
      .then((result) => result.data.msg)
      .catch((err) => setError(err.response.data.error));
  };
  return (
    <div className="login__page">
      <div className="login__users">
        {payload.username !== "" && (
          <div
            className="login__arrow"
            role="presentation"
            onClick={() => setPayload({ username: "", password: "" })}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </div>
        )}
        <AnimatePresence>
          <LayoutGroup>
            {users &&
              users
                .filter(
                  (el) =>
                    payload.username === "" || el.username === payload.username
                )
                .map((el) => (
                  <User
                    key={el.id}
                    username={el.username}
                    payload={payload}
                    setPayload={setPayload}
                  />
                ))}
          </LayoutGroup>
        </AnimatePresence>
      </div>
      <div
        className="login__input"
        role="presentation"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      >
        {payload.username !== "" && (
          <>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={payload.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </>
        )}
        {error && (
          <motion.div
            className="login__error"
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: 3, type: "spring", duration: 0.1 }}
          >
            {error}
          </motion.div>
        )}
      </div>
      <div className="footer">
        <span style={{ fontSize: "1.3rem" }}>&#xA9;</span> 2023 anita darecka --{" "}
        <a href="mailto:anitadarecka@gmail.com">
          contact <FontAwesomeIcon icon={faEnvelope} />
        </a>
        &nbsp;all rights reserved.
      </div>
    </div>
  );
}
