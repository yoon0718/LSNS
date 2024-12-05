import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CommonFunc = () => {
  const [rotate, setRotate] = useState(true);
  const [rotateBack, setRotateBack] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navi = useNavigate();

  const pageStart = () => {
    setTimeout(() => {
      setRotate(false);
    }, 400);
  };

  const handlePageTrans = (path: string) => {
    setRotateBack(true);
    setTimeout(() => {
      setRotateBack(false);
      Navi(path);
    }, 400);
  };

  return {
    pageStart,
    rotate,
    rotateBack,
    handlePageTrans,
    Navi,
    username,
    setUsername,
    password,
    setPassword,
  };
};
