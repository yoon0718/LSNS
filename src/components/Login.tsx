import React, { useEffect } from "react";
import "../css/Login.css";
import { LoginFunc } from "../hooks/LoginFunc";
import thumbnail from "../images/thumbnail.jpg";

const Login: React.FC = () => {
  const {
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
  } = LoginFunc();

  useEffect(() => {
    PageStart();
  }, [PageStart]);

  return (
    <div
      className={`${
        !rotate
          ? rotateBack
            ? "login-container-rotate"
            : "login-container"
          : "login-container-rotate"
      }`}
    >
      <div className="login-thumbnail-space">
        <img src={thumbnail} alt="thumbnail" />
      </div>

      <form method="POST" className="login-form">
        <input
          type="text"
          placeholder="사용자 이름, 전화번호 또는 이메일 주소"
          className="login-input-field"
          value={LoginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input-field"
          value={LoginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`login-button ${isLoginButtonEnabled ? "enabled" : ""}`}
          disabled={!isLoginButtonEnabled}
          onClick={handleLogin}
        >
          로그인
        </button>
        <div className="login-extra-links">
          <span onClick={handleLoginToSignup} className="login-signup-link">
            회원가입
          </span>
          <span className="login-separator">|</span>
          <div onClick={handleLoginToFind} className="login-forgot-password">
            비밀번호를 잊으셨나요?
          </div>
        </div>
        <div className="login-divider">
          <hr /> <span>또는</span> <hr />
        </div>
        <button className="login-google-button">구글로 로그인</button>
        <button className="login-kakao-button">카카오로 로그인</button>
      </form>
    </div>
  );
};

export default Login;
