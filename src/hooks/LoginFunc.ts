import { CommonFunc } from "../hooks/CommonFunc";

export const LoginFunc = () => {
  const {
    rotate,
    rotateBack,
    pageStart,
    handlePageTrans,
    username,
    setUsername,
    password,
    setPassword,
  } = CommonFunc();

  const isLoginButtonEnabled = username.trim() !== "" && password.trim() !== "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://118.220.59.105:3005/account/v1/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: username,
            pw: password,
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
    pageStart,
    rotate,
    rotateBack,
    username,
    setUsername,
    password,
    setPassword,
    isLoginButtonEnabled,
    handleLogin,
    handleLoginToSignup: () => handlePageTrans("/signup"),
    handleLoginToFind: () => handlePageTrans("/findinfo"),
  };
};
