import React from "react";

interface Data {
  title: string;
  button?: string;
}

const Title = ({ title, button }: Data) => {
  return (
    <div>
      <div className="w-[1370px]">
        <div className="flex ml-[71px] mt-[41px] justify-between items-center">
          <div className="flex items-center">
            <div className="">
              <img src="Star.svg" alt="Star" />
            </div>
            <div className="font-bold text-bg-blue-12 text-[30px] ml-5">
              {title}
            </div>
          </div>

          {button && (
            <div className="border border-bg-blue-12 text-bg-blue-12 w-[42px] h-[33px] rounded-[4px] text-[10px] p-2">{button}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
