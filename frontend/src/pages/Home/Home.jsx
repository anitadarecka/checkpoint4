import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";
import windowItems from "../../components/Window/windowItems";
import Navbar from "../../components/Navbar/Navbar";
import Window from "../../components/Window/Window";
import Popup from "../../components/Popups/Popup";
import { useWindow } from "../../contexts/WindowContext";
import icons from "./icons";

export default function Home() {
  const { user } = useAuth();
  const [me, setMe] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { showWindow, setShowWindow } = useWindow();
  useEffect(() => {
    if (user.data) {
      api
        .get("/users/me", { withCredentials: true })
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
      <SpotifyPlayer
        token="
BQB8L_pNX9vPswY_nl7TxegFjN8eaZir0qik9Vz689m-87oPJa4_F32zS5glO7325bU4cyc8jOnXhiHK1gtTpy7REpvDjCm60akx6rvrqRT1VZxC3T-78c5potGEJJbYFFARSGn21Gd7xXypurN2srxcdBYe6Hu1n7FM6UznfVnxEv4UyhL-q9up2QtVGZU9"
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
        autoPlay
        play
        showSaveIcon
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
      {icons &&
        icons.map((el) => (
          <Draggable>
            <div
              key={el.id}
              className="home__icons"
              style={{ left: `${el.position.x}px`, top: `${el.position.y}px` }}
              role="presentation"
              onClick={() =>
                setShowWindow({
                  ...showWindow,
                  [el.title]: { show: true },
                })
              }
            >
              <img src={el.image} alt={el.subject} className="home__icon" />
              {el.title}
            </div>
          </Draggable>
        ))}
      {me && <Navbar me={me} setShowPopup={setShowPopup} />}
      {windowItems &&
        windowItems.map((el, index) => {
          const [window, setWindow] = useState(el);
          const { content } = el;
          if (showWindow[content] !== undefined && showWindow[content].show) {
            return (
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
            );
          }
          return false;
        })}
      {showPopup && (
        <Draggable>
          <div className="popup__window">
            <Popup
              content="Delete user"
              setShowPopup={setShowPopup}
              role={me.role}
              id={me.id}
            />
          </div>
        </Draggable>
      )}
    </div>
  );
}
