// import { Outlet } from "react-router-dom";
import Draggable from "react-draggable";
import { useRef, useState } from "react";
import "./Home.css";
import windowItems from "../../components/Window/windowItems";
import Navbar from "../../components/Navbar/Navbar";
import Window from "../../components/Window/Window";

export default function Home() {
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
      <Navbar />
      {windowItems &&
        windowItems.map((el) => (
          <Draggable
            key={el.id}
            onStart={() => handleZindex(refs[el.id - 1].current)}
          >
            <div
              key={el.id}
              className="window__container"
              ref={refs[el.id - 1]}
            >
              <Window key={el.id} content={el.content} />
            </div>
          </Draggable>
        ))}
      {/* <div className="home__content"></div> */}
    </div>
  );
}
