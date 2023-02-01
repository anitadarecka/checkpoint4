import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({ username: "", password: "" });
  const [response, setResponse] = useState({ msg: "", error: "" });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/")
      .then((res) => setUsers(res.data));
  }, []);
  const handleLogin = () => {
    axios
      .post("http://localhost:8000/api/users/login", payload, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.status === 200) {
          navigate("charging");
        }
      })
      .catch((err) =>
        setResponse({ ...response, error: err.response.data.error })
      );
  };
  const handleArrow = () => {
    setPayload({ username: "", password: "" });
    setResponse({ msg: "", error: "" });
  };
  return (
    <div className="login__page">
      <div className="login__users">
        {payload.username !== "" && (
          <div
            className="login__arrow"
            role="presentation"
            onClick={handleArrow}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </div>
        )}
        <LayoutGroup>
          <AnimatePresence>
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
          </AnimatePresence>
        </LayoutGroup>
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
        {response.error !== "" && (
          <motion.div
            className="login__error"
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: 3, type: "spring", duration: 0.1 }}
          >
            {response.error}
          </motion.div>
        )}
        {response.msg !== "" && <div>{response.msg}</div>}
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
