import React, { useEffect } from "react";
import "../css/FindInfo.css";
import { FindInfoFunc } from "../hooks/FindInfoFunc";
import thumbnail from "../images/thumbnail.jpg";

const FindInfo: React.FC = () => {
  const {
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
  } = FindInfoFunc();

  useEffect(() => {
    PageStart();
  });

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
