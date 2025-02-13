import React from "react";

interface Data {
  title?: string;
  Listlogo?: string;
  List2logo?: string;
  List3logo?: string;
  searchText?: string;
}

type HeaderProps = {
  data: Data;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLead?: () => void;
  onFilter?: () => void;
  onViewChange?: (view: string) => void;
};

const HeaderComp: React.FC<HeaderProps> = ({
  data,
  onSearchChange,
  onAddLead,
  onFilter,
  onViewChange,
}) => {
  return (
    <div className="pt-[48px] flex justify-between items-center px-[70px]">
      <div className="flex gap-[20px] items-center">
        <div className="text-bg-blue-12 font-bold text-[30px]">
          {data.title}
        </div>

        <div className="flex gap-[48px] items-center">
          <div className="flex items-center bg-white rounded-[10px] px-3 w-[420px] h-[44px]  shadow-custom border gap-[6px]">
            <img
              src="/SearchIcon.svg"
              alt="Search"
              className=" text-gray-400 mr-2"
            />
            <input
              type="text"
              name="search"
              placeholder={data.searchText}
              onChange={onSearchChange}
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[16px]"
            />
          </div>

          <div className="flex gap-5 items-center justify-start">
            <div
              className="flex items-center cursor-pointer w-[108px] h-[43px] border border-bg-blue-11 rounded-md gap-[10px] px-1"
              onClick={() => onViewChange?.("list")}
            >
              <img src={data.Listlogo} alt="List View" />
              <div
                className="font-medium text-[14px]"
                style={{ color: "#333333" }}
              >
                List View
              </div>
            </div>
            <img
              src={data.List2logo}
              alt="Grid View"
              className="w-6 h-6 cursor-pointer"
              onClick={() => onViewChange?.("grid")}
            />
            <img
              src={data.List3logo}
              alt="Detailed View"
              className="w-6 h-6 cursor-pointer"
              onClick={() => onViewChange?.("detailed")}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[15px]">
        <button
          className="border bg-bg-blue-12 text-white font-normal px-[10px] py-[10px] w-[124px] h-[44px] rounded-[12px] flex items-center justify-center gap-2"
          onClick={onAddLead}
        >
          <img src="/plus.svg" alt="Add" className="w-[14px] h-[14px]" />
          <div className="text-[14px]">Add Lead</div>
        </button>

        <button
          className="border shadow-custom text-black font-normal px-[10px] py-[10px] w-[91px] h-[40px] rounded-md flex items-center justify-center gap-[10px]"
          onClick={onFilter}
        >
          <img src="/filterC.svg" alt="Filter" />
          <span className="text-[14px]">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderComp;
