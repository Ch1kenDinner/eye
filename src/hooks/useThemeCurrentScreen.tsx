/* eslint-disable import/no-anonymous-default-export */
// import { theme } from "twin.macro";
import { useEffect, useState } from "react";

export default (screens: [string, number][]) => {
  // const screens = Object.entries(theme("screens")).sort((a, b) =>
  //   parseInt(a[1].slice(0, -2)) < parseInt(b[1].slice(0, -2)) ? 1 : -1
  // );
  const [currentScreen, setCurrentScreen] = useState<string | undefined>();

  const setScreen = () => {
    const screen = screens.find(
      ([screen, minWidth]) => matchMedia(`(min-width: ${minWidth}px)`).matches
    );
    screen ? setCurrentScreen(screen[0]) : setCurrentScreen("zero");
  };

  const debouncedSetScreen = setScreen;
  // const debouncedSetScreen = debounce(setScreen, 200);

  useEffect(() => {
    setScreen();
    window.addEventListener("resize", debouncedSetScreen);
    return () => window.removeEventListener("resize", debouncedSetScreen);
  }, []);

  return currentScreen;
};
