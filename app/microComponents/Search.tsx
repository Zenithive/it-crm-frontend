// 1. First, let's modify the Search component to accept onChange and value props
import React from "react";

interface SearchProps {
  children?: React.ReactNode;
  searchText?: string;
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ searchText, children, value, onChange }: SearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-[48px] items-center w-full sm:w-auto">
      <div className="flex items-center bg-white rounded-[10px] px-3 
                      w-full sm:w-[320px] md:w-[420px] h-[44px] 
                      shadow-custom gap-[6px]">
        <img
          src="/SearchIcon.svg"
          alt="Search"
          className="text-gray-400 mr-2 w-4 sm:w-auto"
        />
        <input
          type="text"
          name="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={searchText}
          className="w-full border-none outline-none bg-transparent 
                     text-gray-700 placeholder-gray-400 
                     text-[14px] sm:text-[16px]"
        />
      </div>
      {children}
    </div>
  );
};

export default Search;