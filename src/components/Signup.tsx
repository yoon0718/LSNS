import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import thumbnail from "../images/thumbnail.jpg";

const Signup: React.FC = () => {
  // 3. 회원가입 컨테이너 JSX
  const navi = useNavigate();
  const [rotate, setRotate] = useState(true);
  const [rotateBack, setRotateBack] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      setRotate(false);
    }, 400);
  });

  const handleSignupToLogin = () => {
    setRotateBack(true);
    setTimeout(() => {
      navi("/login");
    }, 400);
  };

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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: SignupUsername }),
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
      if (result === "회원가입에 성공하였습니다.") {
        alert("회원가입 완료");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

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
