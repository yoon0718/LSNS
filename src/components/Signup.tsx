import React, { useEffect } from "react";
import "../css/Signup.css";
import { SignupFunc } from "../hooks/SignupFunc";
import thumbnail from "../images/thumbnail.jpg";

const Signup: React.FC = () => {
  const {
    pageStart,
    rotate,
    rotateBack,
    handleSignupToLogin,
    username,
    setUsername,
    setIsUsernameChecked,
    setUsernameMessage,
    handleCheckDuplicate,
    isUsernameValid,
    usernameMessage,
    password,
    handlePasswordChange,
    passwordValidationMessage,
    confirmPassword,
    handleConfirmPasswordChange,
    passwordMatchMessage,
    phone,
    setPhone,
    email,
    setEmail,
    isSignupButtonEnabled,
    handleSignup,
  } = SignupFunc();

  useEffect(() => {
    pageStart();
  }, [pageStart]);

  return (
    <div
      className={`${
        !rotate
          ? rotateBack
            ? "signup-container-rotate"
            : "signup-container"
          : "signup-container-rotate"
      }`}
    >
      <div className="signup-thumbnail-space">
        <img src={thumbnail} alt="thumbnail" onClick={handleSignupToLogin} />
      </div>

      <form method="POST" className="signup-form">
        <div className="signup-username-container">
          <input
            type="text"
            placeholder="아이디 (소문자 및 숫자 조합, 최대 20자)"
            className="signup-input-field username-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameChecked(false);
              setUsernameMessage("");
            }}
          />
          <button
            type="button"
            className="check-duplicate-button"
            onClick={handleCheckDuplicate}
            disabled={!isUsernameValid || !username.trim()}
          >
            중복확인
          </button>
        </div>
        {usernameMessage && (
          <p
            className={`username-message ${
              usernameMessage.includes("불가능") ? "invalid" : "valid"
            }`}
          >
            {usernameMessage}
          </p>
        )}

        <input
          type="password"
          placeholder="비밀번호 (소문자+숫자+특수문자, 최소 6자)"
          className="signup-input-field"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordValidationMessage && (
          <p className="password-validation-message invalid">
            {passwordValidationMessage}
          </p>
        )}

        <input
          type="password"
          placeholder="비밀번호 확인"
          className="signup-input-field"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordMatchMessage && (
          <p className="password-match-message invalid">
            {passwordMatchMessage}
          </p>
        )}

        <input
          type="tel"
          placeholder="전화번호"
          className="signup-input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="이메일"
          className="signup-input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className={`signup-button ${isSignupButtonEnabled ? "enabled" : ""}`}
          disabled={!isSignupButtonEnabled}
          onClick={handleSignup}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default Signup;
