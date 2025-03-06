import React, { useState } from "react";
import Title from "../../microComponents/Title";
import Search from "../../microComponents/Search";
import HeaderButtons from "../../microComponents/HeaderButtons";
import { HeaderProps, ViewType } from "./OverallLeadsData"


const HeaderComp: React.FC<HeaderProps> = ({
  data,
  onSearchChange,
  onAddLead,
  onFilter,
  onViewChange,
}) => {



  const [activeView, setActiveView] = useState<ViewType>('list')
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    onViewChange?.(view);
  }
  return (
    <div className="pt-[48px] flex justify-between items-center px-[70px]">
      <div className="flex gap-[20px] items-center">
        <div className="text-bg-blue-12 font-bold text-[30px]">
          <Title title={data.title || ''}/>
        </div>

        <div className="flex gap-[48px] items-center">
          <Search  searchText={data.searchText}/>

         
          <div className="flex gap-5 items-center justify-start">
          <div
        className={`flex items-center cursor-pointer px-[20px] py-[7px] rounded-[12px] gap-[10px] ${activeView === 'list' ? 'border border-1 shadow-custom' : ''}`}
        onClick={() => handleViewChange('list')}
      >
        <img src={data.Listlogo} alt="List View"   className={`h-7 w-7 ${activeView === 'list' ? 'opacity-100' : 'opacity-50'}`}/>
        {activeView === 'list' && (
          <div className="font-semibold text-[15px] text-[#333333]">List View</div>
        )}
      </div>
      <div
        className={`flex items-center cursor-pointer px-[20px] py-[7px] rounded-[12px] gap-[10px] ${activeView === 'kanban' ? 'border border-1 shadow-custom rounded-[12px]' : ''}`}
        onClick={() => handleViewChange('kanban')}
      >
        <img src={data.Kanbanlogo} alt="Kanban View"  className={`h-7 w-7 ${activeView === 'kanban' ? 'opacity-100' : 'opacity-50'}`} />
        {activeView === 'kanban' && (
          <div className="font-semibold text-[15px] text-[#333333]">Kanban View</div>
        )}
      </div>
        </div>
      </div>
      </div>

      <HeaderButtons     button1Text={"Filters"}
  button2Text={"Add Lead"}
  button1img={"/filterC.svg"}
  button2img={"/plus.svg"}
  button1width="w-[102px]"
  button2width="w-[124px]" />
    </div>
  );
};

export default HeaderComp;
