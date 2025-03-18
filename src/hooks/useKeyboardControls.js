import { useState, useEffect } from "react";

export function useKeyboardControls() {
  const [keys, setKeys] = useState({
    jukeLeft: false,
    jukeRight: false,
    sprint: false,
    tackleAction: false,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  useEffect(() => {
    const keyDownHandler = (e) => {
      setKeys((keys) => ({
        ...keys,
        jukeLeft: e.key === "q" || keys.jukeLeft,
        jukeRight: e.key === "e" || keys.jukeRight,
        sprint: e.key === "Shift" || keys.sprint,
        tackleAction: e.key === "f" || keys.tackleAction,
        moveForward: e.key === "w" || keys.moveForward,
        moveBackward: e.key === "s" || keys.moveBackward,
        moveLeft: e.key === "a" || keys.moveLeft,
        moveRight: e.key === "d" || keys.moveRight,
      }));
    };

    const keyUpHandler = (e) => {
      setKeys((keys) => ({
        ...keys,
        jukeLeft: e.key === "q" ? false : keys.jukeLeft,
        jukeRight: e.key === "e" ? false : keys.jukeRight,
        sprint: e.key === "Shift" ? false : keys.sprint,
        tackleAction: e.key === "f" ? false : keys.tackleAction,
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