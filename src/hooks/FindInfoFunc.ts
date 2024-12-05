import { useState } from "react";
import { CommonFunc } from "./CommonFunc";

export const FindInfoFunc = () => {
  const {
    rotate,
    rotateBack,
    pageStart,
    handlePageTrans,
    Navi,
    username,
    setUsername,
  } = CommonFunc();
  const [FindIdPhone, setFindIdPhone] = useState("");
  const [FindPasswordPhone, setFindPasswordPhone] = useState("");
  const [isFindIdPhoneValid, setIsFindIdPhoneValid] = useState(false);
  const [isFindPasswordPhoneValid, setIsFindPasswordPhoneValid] =
    useState(false);

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
        Navi("/login");
      }
    } catch (error) {
      alert("정보를 찾는 중 오류가 발생했습니다.");
    }
  };

  const handleFindPassword = () => {
    alert("아직 미구현!");
    Navi("/login");
  };

  return {
    pageStart,
    rotate,
    rotateBack,
    handleFindToLogin: () => handlePageTrans("/login"),
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
