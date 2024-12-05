import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FindInfoFunc = () => {
  const [rotate, setRotate] = useState(true);
  const [rotateBack, setRotateBack] = useState(false);
  const Navi = useNavigate();

  const PageStart = () => {
    setTimeout(() => {
      setRotate(false);
    }, 400);
  };
  const [FindIdPhone, setFindIdPhone] = useState("");
  const [FindPasswordPhone, setFindPasswordPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isFindIdPhoneValid, setIsFindIdPhoneValid] = useState(false);
  const [isFindPasswordPhoneValid, setIsFindPasswordPhoneValid] =
    useState(false);

  const handleFindToLogin = () => {
    setRotateBack(true);
    setTimeout(() => {
      Navi("/login");
    }, 400);
  };

  const handleFindIdPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFindIdPhone(value);
    setIsFindIdPhoneValid(/^[0-9]*$/.test(value));
  };

  const handleFindPasswordPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFindPasswordPhone(value);
    setIsFindPasswordPhoneValid(/^[0-9]*$/.test(value));
  };

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://118.220.59.105:3005/account/findId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: FindIdPhone,
          }),
        }
      );

      const result = await response.text();
      if (result === "가입 정보가 찾아지지 않습니다") {
        alert(result);
      } else {
        alert(`회원님의 아이디는 ${result} 입니다.`);
        Navi(0);
      }
    } catch (error) {
      alert("정보를 찾는 중 오류가 발생했습니다.");
    }
  };

  const handleFindPassword = () => {
    alert("아직 미구현!");
  };

  return {
    PageStart,
    rotate,
    rotateBack,
    handleFindToLogin,
    FindIdPhone,
    handleFindIdPhoneChange,
    isFindIdPhoneValid,
    handleFindId,
    username,
    setUsername,
    FindPasswordPhone,
    handleFindPasswordPhoneChange,
    isFindPasswordPhoneValid,
    handleFindPassword,
  };
};
