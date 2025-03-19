import React from "react";

interface SearchProps {
  children?: React.ReactNode;
  searchText?: string;
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ searchText, children, value, onChange }: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Call the parent's onChange with the input value
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center w-full sm:w-auto">
      <div
        className="flex items-center bg-white rounded-lg px-3
                      w-full sm:w-[320px] md:w-[420px]  h-11
                      shadow-custom gap-2"
      >
        <img
          src="/SearchIcon.svg"
          alt="Search"
          className="text-gray-400 mr-2 w-4 sm:w-auto"
        />
        <input
          type="text"
          name="search"
          value={value}
          onChange={handleInputChange}
          placeholder={searchText}
          className="w-full border-none outline-none bg-transparent
                     text-gray-700 placeholder-gray-400
                     text-base "
        />
      </div>
      {children}
    </div>
  );
};

export default Search;
