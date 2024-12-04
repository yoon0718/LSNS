import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FirstPage.css";
import thumbnail from "../images/thumbnail.jpg";

const FirstPage: React.FC = () => {
  const navi = useNavigate();
  // 1. 화면 전환 관리
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [LoginDisplay, setLoginDisplay] = useState(true);
  const [SignupDisplay, setSignupDisplay] = useState(false);
  const [isLoginPageRotating, setIsLoginPageRotating] = useState(false);
  const [isSignupPageRotating, setIsSignupPageRotating] = useState(false);
  const handleLoginToSignup = () => {
    setIsLoginPage(false);
    setLoginUsername("");
    setLoginPassword("");
    setTimeout(() => {
      setLoginDisplay(false);
      setSignupDisplay(true);
      setIsSignupPageRotating(true);
      setTimeout(() => setIsSignupPageRotating(false), 400);
    }, 400);
  };
  const handleSignupToLogin = () => {
    setIsLoginPage(true);
    setSignupUsername("");
    setSignupPassword("");
    setConfirmPassword("");
    setPhone("");
    setEmail("");
    setUsernameMessage("");
    setPasswordMatchMessage("");
    setIsUsernameChecked(false);
    setTimeout(() => {
      setLoginDisplay(true);
      setSignupDisplay(false);
      setIsLoginPageRotating(true);
      setTimeout(() => setIsLoginPageRotating(false), 400);
    }, 400);
  };
  // 2. 로그인 페이지 JSX
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  // 2 - 1. 비활성화 상태 관리
  const isLoginButtonEnabled =
    LoginUsername.trim() !== "" && LoginPassword.trim() !== "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 로그인 요청 주소 입력 (결과는 현재 alert로 대체)
      const response = await fetch(`http://118.220.59.105:3005/account/v1/${LoginUsername}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: LoginUsername,
          pw: LoginPassword,
        }),
      });

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

  // 3. 회원가입 컨테이너 JSX
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  // 3 - 1. 아이디 & 비밀번호 형식 검사
  const isUsernameValid = /^[a-z0-9]{1,20}$/.test(SignupUsername);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{6,}$/.test(
      SignupPassword
    );
  const isPhoneValid = /^[0-9]*$/.test(phone);
  const isPasswordMatch = SignupPassword === confirmPassword;
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setSignupPassword(password);

    if (
      password.trim() !== "" &&
      !/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{6,}$/.test(password)
    ) {
      setPasswordValidationMessage(
        "비밀번호 형식을 확인해주세요. (소문자 + 숫자 + 특수문자)"
      );
    } else {
      setPasswordValidationMessage("");
    }
  };
  // 3 - 2. 회원가입 버튼 활성화 조건
  const isSignupButtonEnabled =
    SignupUsername.trim() !== "" &&
    SignupPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    isUsernameValid &&
    isPasswordValid &&
    isPhoneValid &&
    isPasswordMatch &&
    isUsernameChecked &&
    !usernameMessage.includes("불가능");

  // 3 - 3. 아이디 중복 확인 함수
  const handleCheckDuplicate = async () => {
    if (!SignupUsername.trim() || !isUsernameValid) {
      alert("유효한 아이디를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(
        // 아이디 중복 검사 페이지 주소 입력
        `http://118.220.59.105:3005/account/check`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id:SignupUsername})
        }
      );
      const result = await response.text();

      if (result === "이미 가입된 ID입니다") {
        setUsernameMessage("사용 불가능한 아이디 입니다.");
      } else {
        setUsernameMessage("사용 가능한 아이디 입니다.");
      }
    } catch (error) {
      setIsUsernameChecked(true);
      alert("중복 확인 요청 중 오류가 발생했습니다.");
    }
    setIsUsernameChecked(true);
  };

  // 3 - 4. 비밀번호 확인 메시지
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchMessage(
      e.target.value !== SignupPassword ? "비밀번호가 동일하지 않습니다." : ""
    );
  };
  // 3 - 5. 회원가입 요청
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://118.220.59.105:3005/account/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: SignupUsername,
          password: SignupPassword,
          phone: phone,
          email: email,
        }),
      });

      const result = await response.text();
      if (result === "회원가입에 성공하였습니다."
      ) {
        alert("회원가입 완료");
        navi(0);
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  // 4. 로그인 페이지 HTML
  return (
    <div className="main-frame">
      <div
        className={`${
          isLoginPage
            ? isLoginPageRotating
              ? "login-container-rotate-back"
              : "login-container"
            : "login-container-rotate"
        }`}
        style={{ display: LoginDisplay ? "flex" : "none" }}
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
            <a href="#" className="login-forgot-password">
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="login-divider">
            <hr /> <span>또는</span> <hr />
          </div>
          <button className="login-google-button">구글로 로그인</button>
          <button className="login-kakao-button">카카오로 로그인</button>
        </form>
      </div>

      {/* 회원가입 페이지 HTML */}
      <div
        className={`${
          !isLoginPage
            ? isSignupPageRotating
              ? "signup-container-rotate-back"
              : "signup-container"
            : "signup-container-rotate"
        }`}
        style={{ display: SignupDisplay ? "flex" : "none" }}
      >
        <div className="signup-thumbnail-space">
          <img onClick={handleSignupToLogin} src={thumbnail} alt="썸네일" />
        </div>
        <form method="POST" className="signup-form">
          <div className="signup-username-container">
            <input
              type="text"
              placeholder="아이디 (소문자 및 숫자 조합, 최대 20자)"
              className="signup-input-field username-input"
              value={SignupUsername}
              onChange={(e) => {
                setSignupUsername(e.target.value);
                setIsUsernameChecked(false);
                setUsernameMessage("");
              }}
            />
            <button
              type="button"
              className="check-duplicate-button"
              onClick={handleCheckDuplicate}
              disabled={!isUsernameValid || SignupUsername.trim() === ""}
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
            value={SignupPassword}
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
            className={`signup-button ${
              isSignupButtonEnabled ? "enabled" : ""
            }`}
            disabled={!isSignupButtonEnabled}
            onClick={handleSignup}
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirstPage;
