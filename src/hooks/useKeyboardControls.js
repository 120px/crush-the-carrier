import { useState, useEffect } from "react";

export function useKeyboardControls() {
  const [keys, setKeys] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  useEffect(() => {
    const keyDownHandler = (e) => {
      setKeys((keys) => ({
        ...keys,
        moveForward: e.key === "w" || keys.moveForward,
        moveBackward: e.key === "s" || keys.moveBackward,
        moveLeft: e.key === "a" || keys.moveLeft,
        moveRight: e.key === "d" || keys.moveRight,
      }));
    };

    const keyUpHandler = (e) => {
      setKeys((keys) => ({
        ...keys,
        moveForward: e.key === "w" ? false : keys.moveForward,
        moveBackward: e.key === "s" ? false : keys.moveBackward,
        moveLeft: e.key === "a" ? false : keys.moveLeft,
        moveRight: e.key === "d" ? false : keys.moveRight,
      }));
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return keys;
}