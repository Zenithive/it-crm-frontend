"use client";
import { ChangeEvent, useEffect, useState } from "react";

import HeaderComp from "./HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView";
import { columnDefs } from "./OverallLeadsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
// import overallLeadApiService from "../../api/apiService/overallLeadApiService";
import { fetchFromJSONForListView } from "../../api/jsonService/OverallLeadsJsonService";
import AddLeadModal from "../AddLeadModal";

type ViewType = "list" | "kanban";

const Contact = () => {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [rowData, setRowData] = useState<any[]>([]);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const useAPI = process.env.NEXT_PUBLIC_USE_API === "true";

  // const {data, loading, error, totalItems } = overallLeadApiService(
  //   currentPage,
  //   itemsPerPage
  // );

  // useEffect(() => {
  //   setRowData(data);  
  // }, [data]);

  const user = useSelector((state: RootState) => state.auth);

  const handleAddLead = () => {
    setShowAddLeadModal(true);
  };

  const handleCloseModal = () => {
    setShowAddLeadModal(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("Search Input:", e.target.value);
  };

  const handleFilter = () => {
    // console.log("Filter clicked");
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    // console.log("View changed to:", view);
  };

  return (
    <>
      <HeaderComp
        data={{
          title: "Lead",
          Listlogo: "viewList.svg",
          Kanbanlogo: "kanban.svg",

          searchText: "Search Leads...",
        }}
        onSearchChange={handleSearchChange}
        onAddLead={handleAddLead}
        onFilter={handleFilter}
        onViewChange={handleViewChange}
      />

      <div className="pt-[40px]">
        {activeView === "list" ? (
          <MicroTable rowData={rowData} columnDefs={columnDefs} />
        ) : (
          // <KanbanView/>
          <DndProvider backend={HTML5Backend}>
            <KanbanView />
          </DndProvider>
        )}
      </div>

      {showAddLeadModal && <AddLeadModal onClose={handleCloseModal} />}
    </>
  );
};

export default Contact;
