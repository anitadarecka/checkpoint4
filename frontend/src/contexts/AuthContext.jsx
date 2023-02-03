import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const authContext = createContext({});

export function AuthProvider({ children }) {
  const { Provider } = authContext;
  const navigate = useNavigate();
  const [user, setUser] = useState({ data: null });

  const login = (payload) => {
    setUser({ data: payload });
  };

  const logout = () => {
    setUser({ data: null });
    window.localStorage.removeItem("user");
  };

  useEffect(() => {
    const data = window.localStorage.getItem("user");
    if (data) {
      setUser({ data: JSON.parse(data) });
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user.data) {
      window.localStorage.setItem("user", JSON.stringify(user.data));
      // navigate("/home");
    }
  }, [user]);

  return (
    <Provider value={{ login, logout, user, setUser }}>{children}</Provider>
  );
}

AuthProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export const useAuth = () => useContext(authContext);
