import React from "react";

interface IconButtonProps {
  icon: string;
  text: string;
  onClick?: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2  rounded-lg shadow-custom hover:bg-gray-50 ${className}`}
    >
      <img src={icon} alt={text} />
      <div className="text-bg-blue-12 font-semibold">{text}</div>
    </button>
  );
};

export default IconButton;