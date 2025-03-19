import React from "react";

interface Data {
  children?: React.ReactNode;
  button1width?: string;
  button2width?: string;
  button1img?: string;
  button2img?: string;
  button1Text?: string;
  button2Text?: string;
  onClick1?: () => void;  
  onClick2?: () => void; 
  onClick3?: () => void; 
  button2Action?: () => void; 
}

const HeaderButtons = ({
  button1Text,
  button2Text,
  button1img,
  button2img,
  button1width,
  button2width,
  onClick1,
  onClick2,
  onClick3,
  button2Action,
}: Data) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
      <button
        className={`${button1width} min-w-28 border shadow-sm bg-white text-bg-blue-12 font-normal h-10 rounded-xl flex items-center justify-center gap-2`}
        onClick={onClick1}
      >
        <img src={button1img} className="w-4 sm:w-auto" alt="" />
        <div className="text-sm whitespace-nowrap">{button1Text}</div>
      </button>

      {/* Conditionally render button2 only if button2Text is provided */}
      {button2Text && (
        <button
          className={`${button2width} min-w-28 bg-bg-blue-12 text-white font-normal h-10 rounded-xl flex items-center justify-center gap-2`}
          onClick={() => {
            onClick2?.();
            button2Action?.();
            onClick3?.();
          }}
        >
          <img src={button2img} className="w-4 sm:w-auto" alt="" />
          <span className="text-sm whitespace-nowrap">{button2Text}</span>
        </button>
      )}
    </div>
  );
};

export default HeaderButtons;