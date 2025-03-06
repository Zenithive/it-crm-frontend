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

type ViewType = "list" | "kanban";

const Contact = () => {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [rowData, setRowData] = useState<any[]>([]);
  const useAPI = process.env.NEXT_PUBLIC_USE_API === "false";
  useEffect(() => {
    const fetchData = async () => {
      const data = useAPI
        ? await fetchFromAPIForListView()
        : await fetchFromJSONForListView();
      setRowData(data);
    };

    fetchData();
  }, [useAPI]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("Search Input:", e.target.value);
  };

  const handleAddLead = () => {
    // console.log("Add Lead clicked");
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
    </>
  );
};

export default Contact;
