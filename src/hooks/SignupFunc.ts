import { useState } from "react";
import { CommonFunc } from "./CommonFunc";

export const SignupFunc = () => {
  const {
    rotate,
    rotateBack,
    pageStart,
    handlePageTrans,
    Navi,
    username,
    setUsername,
    password,
    setPassword,
  } = CommonFunc();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const isUsernameValid = /^[a-z0-9]{1,20}$/.test(username);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{6,}$/.test(password);

  const isPhoneValid = /^[0-9]*$/.test(phone);
  const isPasswordMatch = password === confirmPassword;
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

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

  const isSignupButtonEnabled =
    username.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    isUsernameValid &&
    isPasswordValid &&
    isPhoneValid &&
    isPasswordMatch &&
    isUsernameChecked &&
    !usernameMessage.includes("불가능");

  const handleCheckDuplicate = async () => {
    try {
      const response = await fetch(`http://118.220.59.105:3005/account/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: username }),
      });
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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchMessage(
      e.target.value !== password ? "비밀번호가 동일하지 않습니다." : ""
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://118.220.59.105:3005/account/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: username,
          password: password,
          phone: phone,
          email: email,
        }),
      });

      const result = await response.text();
      if (result === "회원가입에 성공하였습니다.") {
        alert("회원가입 완료");
        Navi("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  return {
    pageStart,
    rotate,
    rotateBack,
    handleSignupToLogin: () => handlePageTrans("/login"),
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
  };
};
