import React, { useState } from 'react';

interface GoogleCalendarButtonProps {
  toggleCalendar: (isVisible: boolean) => void;
  isLoggedIn: boolean;  // Prop to ensure login status
}

const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({ toggleCalendar, isLoggedIn }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      const newVisibility = !isCalendarVisible;
      setIsCalendarVisible(newVisibility);
      toggleCalendar(newVisibility);
    } else {
      alert('로그인 후 구글 달력에 접근 가능합니다.'); // Login prompt message
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-[150px] right-[175px] w-[140px] h-[40px] font-semibold rounded-md shadow-md transition-colors duration-300 ${
        isCalendarVisible ? 'bg-[#347fff] text-white' : 'bg-white text-[#347fff] border-2 border-[#347fff]'
      }`}
      style={{ zIndex: 9999, transform: 'scale(1.00)' }}
    >
      {isCalendarVisible ? '구글 달력 숨기기' : '구글 달력 보기'}
    </button>
  );
};

export default GoogleCalendarButton;
