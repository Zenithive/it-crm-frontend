import React from "react";

interface Data {
  title: string;
  children?: React.ReactNode;
}

const Title = ({ title, children }: Data) => {
  return (
    <div>
      <div className="w-full">
        <div className="flex  justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-bg-blue-12 text-[30px]">{title}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Title;
