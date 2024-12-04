import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Common = (initialRotate = true, initialRotateBack = false) => {
  const [rotate, setRotate] = useState(initialRotate);
  const [rotateBack, setRotateBack] = useState(initialRotateBack);

  const Navi = useNavigate();

  const PageStart = () => {
    useEffect(() => {
      setTimeout(() => {
        setRotate(false);
      }, 400);
    });
  };

  const OnRotateBack = () => {
    setRotateBack(true);
  };

  return { rotate, rotateBack, Navi, PageStart, OnRotateBack };
};
