/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react";

export default (delay: number = 1000) => {
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const debouncedHandleResize = handleResize;
  // const debouncedHandleResize = debounce(handleResize, delay);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return width;
};
