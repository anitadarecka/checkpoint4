import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";
import windowItems from "../../components/Window/windowItems";
import Navbar from "../../components/Navbar/Navbar";
import Window from "../../components/Window/Window";

export default function Home() {
  const { user } = useAuth();
  const [me, setMe] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data) {
      axios
        .get("http://localhost:8000/api/users/me", { withCredentials: true })
        .then((res) => setMe(res.data[0]))
        .catch((err) => console.error(err));
    } else {
      navigate("/");
    }
  }, [user]);
  const refs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < windowItems.length; i++) {
    refs.push(useRef());
  }
  const [currentZIndex, setCurrentZIndex] = useState(5);
  const handleZindex = (element) => {
    // eslint-disable-next-line no-param-reassign
    element.style.zIndex = currentZIndex;
    setCurrentZIndex((state) => state + 1);
  };
  return (
    <div className="home__page">
      {me && <Navbar me={me} />}
      {windowItems &&
        windowItems.map((el, index) => {
          const [window, setWindow] = useState(el);
          // const { content } = el;
          return (
            window.show && (
              <Draggable
                key={el.id}
                onStart={() => handleZindex(refs[el.id - 1].current)}
              >
                <div
                  key={el.id}
                  className="window__container"
                  style={{ left: `${el.left}px`, top: `${el.top}px` }}
                  ref={refs[el.id - 1]}
                >
                  <Window
                    key={el.id}
                    index={index}
                    content={el.content}
                    window={window}
                    setWindow={setWindow}
                  />
                </div>
              </Draggable>
            )
          );
        })}
      {/* <div className="home__content"></div> */}
    </div>
  );
}
