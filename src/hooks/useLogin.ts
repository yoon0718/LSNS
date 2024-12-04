import { useState } from "react";
import { Common } from "./Common";

export const useLogin = () => {
  const { Navi, OnRotateBack } = Common();
  const handleLoginToSignup = () => {
    OnRotateBack();
    setTimeout(() => {
      Navi("/signup");
    }, 400);
  };

  const handleLoginToFind = () => {
    OnRotateBack();
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
