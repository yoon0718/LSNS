import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FindInfo.css";
import thumbnail from "../images/thumbnail.jpg";

const FindInfo: React.FC = () => {
  const navi = useNavigate();
  const [rotate, setRotate] = useState(true);
  const [rotateBack, setRotateBack] = useState(false);
  const [FindIdPhone, setFindIdPhone] = useState("");
  const [FindPasswordPhone, setFindPasswordPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isFindIdPhoneValid, setIsFindIdPhoneValid] = useState(false);
  const [isFindPasswordPhoneValid, setIsFindPasswordPhoneValid] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRotate(false);
    }, 400);
  });

  const handleFindToLogin = () => {
    setRotateBack(true);
    setTimeout(() => {
      navi("/login");
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
      }
    } catch (error) {
      alert("정보를 찾는 중 오류가 발생했습니다.");
    }
  };

  const handleFindPassword = () => {
    alert("아직 미구현!");
  };

  return (
    <div
      className={`${
        !rotate
          ? rotateBack
            ? "findinfo-container-rotate"
            : "findinfo-container"
          : "findinfo-container-rotate"
      }`}
    >
      <div className="findinfo-thumbnail-space">
        <img src={thumbnail} alt="thumbnail" onClick={handleFindToLogin} />
      </div>

      <form className="findinfo-form">
        <div>아이디 찾기</div>
        <input
          type="tel"
          placeholder="전화번호 입력"
          className="findinfo-input-field"
          value={FindIdPhone}
          onChange={handleFindIdPhoneChange}
        />
        <button
          type="button"
          className={`findinfo-button ${isFindIdPhoneValid ? "enabled" : ""}`}
          disabled={!isFindIdPhoneValid}
          onClick={handleFindId}
        >
          아이디 찾기
        </button>
        <br />
        <div>비밀번호 찾기</div>
        <input
          type="text"
          placeholder="아이디 입력"
          className="findinfo-input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="tel"
          placeholder="전화번호 입력"
          className="findinfo-input-field"
          value={FindPasswordPhone}
          onChange={handleFindPasswordPhoneChange}
        />
        <button
          type="button"
          className={`findinfo-button ${
            username.trim() && isFindPasswordPhoneValid ? "enabled" : ""
          }`}
          disabled={!username.trim() || !isFindPasswordPhoneValid}
          onClick={handleFindPassword}
        >
          비밀번호 찾기
        </button>
      </form>
    </div>
  );
};

export default FindInfo;
