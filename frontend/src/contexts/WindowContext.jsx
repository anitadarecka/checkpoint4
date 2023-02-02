import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

const windowContext = createContext({});

export function WindowProvider({ children }) {
  const { Provider } = windowContext;
  const [randomCoordinates, setRandomCoordinates] = useState({
    x: 100,
    y: 150,
  });
  const getRandomPosition = (width, height) => {
    const randomX = Math.random() * (width - 600 - 50) + 50;
    const randomY = Math.random() * (height - 500 - 50) + 50;
    setRandomCoordinates({ x: randomX, y: randomY });
  };
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const getScreenSize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  };
  // useEffect(() => {
  //   if (screenSize.width) {
  //     getRandomPosition(screenSize.width, screenSize.height);
  //   }
  // }, [screenSize.width]);
  const [showWindow, setShowWindow] = useState({
    About: { show: true },
    Music: { show: true },
    Notes: { show: true },
  });
  return (
    <Provider
      value={{
        randomCoordinates,
        getScreenSize,
        getRandomPosition,
        screenSize,
        showWindow,
        setShowWindow,
      }}
    >
      {children}
    </Provider>
  );
}

WindowProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export const useWindow = () => useContext(windowContext);
