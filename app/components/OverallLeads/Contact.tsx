"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import HeaderComp from "./HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView";
import Pagination2 from "../../microComponents/Pagination2";
import { columnDefs } from "./OverallLeadsData";
import useOverallLeadsData from "../../api/apiService/OverallLeadApiService";

type ViewType = "list" | "kanban";

const Contact = () => {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { leads, totalCount, loading } = useOverallLeadsData(currentPage, pageSize);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Search Input:", e.target.value);
  };

  const handleAddLead = () => {
    console.log("Add Lead clicked");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    console.log("View changed to:", view);
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
        {loading ? (
          <div className="text-center p-6">Loading data...</div>
        ) : activeView === "list" ? (
          <>
            <MicroTable rowData={leads} columnDefs={columnDefs} />
            <Pagination2
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => setPageSize(size)}
            />
          </>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <KanbanView />
          </DndProvider>
        )}
      </div>
    </>
  );
};

export default Contact;
