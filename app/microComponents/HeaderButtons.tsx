import React from "react";

interface Data {
  children?: React.ReactNode;
  button1width?: string;
  button2width?: string;
  button1img?: string;
  button2img?: string;
  button1Text?: string;
  button2Text?: string;
  onClick1?: () => void;  // Changed from string to function type
  onClick2?: () => void;  // Changed from function type
}

const HeaderButtons = ({
  button1Text,
  button2Text,
  button1img,
  button2img,
  button1width,
  button2width,
  onClick1,
  onClick2
}: Data) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-[15px] w-full sm:w-auto">
      <button
        className={`border shadow-sm bg-white text-bg-blue-12 font-normal h-[40px] rounded-xl 
                   flex items-center justify-center gap-2 w-full sm:w-auto 
                   ${button1width} min-w-[100px]`}
        onClick={onClick1}  // Add onClick handler
      >
        <img src={button1img} className="w-4 sm:w-auto" alt="" />
        <div className="text-[12px] sm:text-[14px] whitespace-nowrap">{button1Text}</div>
      </button>

      <button
        className={`bg-bg-blue-12 text-white font-normal h-[40px] rounded-xl 
                   flex items-center justify-center gap-[10px] w-full sm:w-auto 
                   ${button2width} min-w-[120px]`}
        onClick={onClick2}  // Add onClick handler
      >
        <img src={button2img} className="w-4 sm:w-auto" alt="" />
        <span className="text-[12px] sm:text-[14px] whitespace-nowrap">{button2Text}</span>
      </button>
    </div>
  );
};

export default HeaderButtons;