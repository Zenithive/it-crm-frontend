"use client";
import { ChangeEvent, useEffect, useState } from "react";

import HeaderComp from "./HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView";
import { columnDefs } from "./OverallLeadsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchFromAPIForListView } from "../../api/apiService/OverallLeadApiService";
import { fetchFromJSONForListView } from "../../api/jsonService/OverallLeadsJsonService";
import Pagination2 from "../../microComponents/Pagination2";

type ViewType = "list" | "kanban";

const Contact = () => {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [rowData, setRowData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  

  const useAPI = process.env.NEXT_PUBLIC_USE_API === "true"; // Updated condition for clarity

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (useAPI) {
          const { data, totalCount } = await fetchFromAPIForListView(currentPage, pageSize);
          setRowData(data);
          setTotalCount(totalCount);
        } else {
          const data = await fetchFromJSONForListView();
          setRowData(data);
          setTotalCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [useAPI, currentPage, pageSize]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Search Input:", e.target.value);
  };

  const handleAddLead = () => {
    // setIsModalOpen(true); // Open modal on button click
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
            <MicroTable rowData={rowData} columnDefs={columnDefs} />
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
