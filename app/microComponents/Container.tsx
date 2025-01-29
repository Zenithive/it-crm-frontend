import React from "react";

interface Data {
  containerWidth?: string;
  containerHeight?: string;
  title?: string;
  logo?: string;
  text?:string;
  children?: React.ReactNode;
}

const Container = ({ containerHeight, containerWidth, title, logo,children,text }: Data) => {
  return (
    <div>
      <div
        className="bg-bg-gray-11 border-2 border-individuals_border rounded-lg text-bg-blue-12 font-semibold text-[16px]"
        style={{ height: containerHeight, width: containerWidth }}
      >
        <div className="flex justify-between">
          <div className="ml-[20px] mt-[8px]">{title}</div>
          {logo && <img src={logo} alt="Logo" className="w-6 h-6 mt-2 mr-3" />}
          {text}
        </div>
        <div className="">
          <hr className="border-individuals_border border mt-[10px]"></hr>
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
