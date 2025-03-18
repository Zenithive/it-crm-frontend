"use client";
import React from "react";
import Search from "../../microComponents/Search";
import HeaderButtons from "../../microComponents/HeaderButtons";
import Title from "../../microComponents/Title";

interface HeaderProps {
  title: string;
  searchText: string;
  headerButtons: {
    button1text: string;
    button1img: string;
    button2text: string;
    button2img: string;
  };
  viewType?: "grid" | "table";
  onViewTypeChange?: (viewType: "grid" | "table") => void;
  onAddButtonClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  searchText,
  headerButtons,
  viewType = "grid",
  onViewTypeChange,
  onAddButtonClick,
}) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <Title title={title} />
          <Search searchText={searchText} value={""} onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
        <div className="flex items-center space-x-6">
          {onViewTypeChange && (
            <div className="flex space-x-4">
              <button
                className={`w-7 h-7 ${
                  viewType === "grid" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => onViewTypeChange("grid")}
              >
                <img
                  src={
                    viewType === "grid"
                      ? "/overallCaseStudy.svg"
                      : "/overallCaseStudy_2.svg"
                  }
                  alt="Grid View"
                  className=""
                />
              </button>
              <button
                className={`w-7 h-7 ${
                  viewType === "table" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => onViewTypeChange("table")}
              >
                <img
                  src={
                    viewType === "table"
                      ? "/tabler_layout-list_2.svg"
                      : "/tabler_layout-list.svg"
                  }
                  alt="Table View"
                  className=""
                />
              </button>
            </div>
          )}

          <HeaderButtons
            button1Text={headerButtons.button1text}
            button1img={headerButtons.button1img}
            button2Text={headerButtons.button2text}
            button2img={headerButtons.button2img}
            button2width="w-[160px]"
            onClick2={onAddButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
