import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginFunc = () => {
  const [rotate, setRotate] = useState(true);
  const [rotateBack, setRotateBack] = useState(false);
  const Navi = useNavigate();

  const PageStart = () => {
    setTimeout(() => {
      setRotate(false);
    }, 400);
  };

  const handleLoginToSignup = () => {
    setRotateBack(true);
    setTimeout(() => {
      Navi("/signup");
    }, 400);
  };

  const handleLoginToFind = () => {
    setRotateBack(true);
    setTimeout(() => {
      Navi("/findinfo");
    }, 400);
  };

  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const isLoginButtonEnabled =
    LoginUsername.trim() !== "" && LoginPassword.trim() !== "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://118.220.59.105:3005/account/v1/${LoginUsername}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: LoginUsername,
            pw: LoginPassword,
          }),
        }
      );

      const result = await response.text();
      if (result === "로그인 성공") {
        alert("로그인 완료");
      } else {
        alert("존재하지 않는 아이디이거나 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  };

  return {
    PageStart,
    rotate,
    rotateBack,
    LoginUsername,
    setLoginUsername,
    LoginPassword,
    setLoginPassword,
    isLoginButtonEnabled,
    handleLogin,
    handleLoginToSignup,
    handleLoginToFind,
  };
};
