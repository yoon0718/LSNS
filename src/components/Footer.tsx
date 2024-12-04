// Footer.tsx
import React from 'react';
import '../css/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear}</p>
      <a href="#">약관</a>
      <a href="#">개인정보처리방침</a>
      <a href="#">쿠키 정책</a>
      <a href="#">문제 신고</a>
    </footer>
  );
};

export default Footer;
