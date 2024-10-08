import React from "react";

interface SearchBtnProps {
  icon: React.ReactNode;
  text: string;
  borderColor: string;
  textColor: string;
  onClick: () => void;
}

const SearchBtn: React.FC<SearchBtnProps> = ({
  icon,
  text,
  borderColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-[96px] h-[36px] font-bold text-[13px] border rounded`}
      style={{ borderColor: borderColor, color: textColor }}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};

export default SearchBtn;
