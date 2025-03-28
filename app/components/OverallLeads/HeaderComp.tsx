import React, { useState} from "react";
import Title from "../../microComponents/Title";
import Search from "../../microComponents/Search";
import HeaderButtons from "../../microComponents/HeaderButtons";
import { HeaderProps, ViewType } from "./OverallLeadsData";
import AddLeadModal from "../AddLeadModal";

import FilterHandler from "../Filter/FilterHandler";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";





const HeaderComp: React.FC<HeaderProps> = ({
  data,
  onSearchChange,
  searchQuery,
  onAddLead,
  onFilter,
  onViewChange,
  pageType
  
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLeadModalVisible, setIsLeadModalVisible] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("list");
const [showFilter, setShowFilter] = useState(false);
  
   const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [campaignFilter, setCampaignFilter] = useState<string | undefined>(undefined);
  const [stageFilter, setStageFilter] = useState<string | undefined>(undefined);
const {  refetch } =  useOverallLeadsData(1,100,stageFilter,typeFilter,campaignFilter);

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    onViewChange?.(view);
  };

  const showLeadModal = () => {
    setIsLeadModalVisible(true);
  };

  const hideLeadModal = () => {
    setIsLeadModalVisible(false);
  };

  const filterSections = [
    {
      id: "date",
      title: "Date",
      options: [
        { id: "days", label: "Last 7 Days", checked: false },
        { id: "start_date", label: "Start Date", checked: false },
        { id: "end_date", label: "End Date", checked: false },
    
      ]
    },
    {
      id: "stage",
      title: "Stage",
      options: [
        { id: "NEW", label: "New Lead", checked: false },
        { id: "Qualified", label: "Qualified", checked: false },
        { id: "Negotiation", label: "Negotiation", checked: false },
        { id: "CLOSED_WON", label: "Close Won", checked: false },
        { id: "CLOSED_LOST", label: "Close Lost", checked: false }
      ]
    },
    {
      id: "type",
      title: "Type",
      options: [
        { id: "ENTERPRISE", label: "Enterprise", checked: false },
        { id: "SMALL", label: "Small", checked: false },
        { id: "MEDIUM", label: "Medium", checked: false },
      ]
    },
    {
      id: "campaign",
      title: "Campaign",
      options: [
        { id: "zenzziy", label: "Zenzziy lnc", checked: false },
        { id: "prisam", label: "Prisam lnc", checked: false },
        { id: "tuvok", label: "Tuvok lnc", checked: false },
        { id: "zenzziyL", label: "Zenzziy lnc", checked: false },]
    }

  ];
 

  return (

<>
<div className="pt-7 flex justify-between items-center px-7">
  <div className="flex gap-5 items-center">
    <div className="text-bg-blue-12 font-bold text-[30px]">
      <Title title={data.title || ""} />
    </div>
    <div className="flex gap-12 items-center">
      <Search
        searchText={data.searchText}
        value={searchQuery || ""}
        onChange={handleSearchChange}
      />
      {pageType === 'contact' && (
        <div className="flex gap-5 items-center justify-start">
          <div
            className={`flex items-center cursor-pointer px-5 py-2 rounded-xl gap-2 ${
              activeView === "list" ? "border border-1 shadow-custom" : ""
            }`}
            onClick={() => handleViewChange("list")}
          >
            <img
              src={data.Listlogo}
              alt="List View"
              className={`h-7 w-7 ${
                activeView === "list" ? "opacity-100" : "opacity-50"
              }`}
            />
            {activeView === "list" && (
              <div className="font-semibold text-[15px] text-gray-text">
                List View
              </div>
            )}
          </div>
          <div
            className={`flex items-center cursor-pointer px-5 py-2 rounded-xl gap-2 ${
              activeView === "kanban"
                ? "border border-1 shadow-custom rounded-xl"
                : ""
            }`}
            onClick={() => handleViewChange("kanban")}
          >
            <img
              src={data.Kanbanlogo}
              alt="Kanban View"
              className={`h-7 w-7 ${
                activeView === "kanban" ? "opacity-100" : "opacity-50"
              }`}
            />
            {activeView === "kanban" && (
              <div className="font-semibold text-[15px] text-gray-text">
                Kanban View
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
  <HeaderButtons
          button1Text={"Filters"}
          button1img={"/filterC.svg"}
          button1width="w-[102px]"
         
          {...(pageType === 'contact' ? {
            button2Text: "Add Lead",
            button2img: "/plus.svg",
            button2width: "w-[124px]",
            onClick2: showLeadModal
          } : {})}
          onClick1={() => setShowFilter(true)}
        />
</div>
{pageType === 'contact' && isLeadModalVisible && <AddLeadModal onClose={hideLeadModal} />}
{showFilter && (
  <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <FilterHandler
      filterSections={pageType === 'deals' 
        ? filterSections.filter(section => section.id !== 'stage')
        : filterSections}
      onFilterApply={onFilter || (() => {})}
      setShowFilter={setShowFilter}
      pageType="contact"
    />
  </div>
)}
</>
  );
};

export default HeaderComp;

