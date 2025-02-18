

"use client";
import { ChangeEvent, useState } from "react";
import Title from "../../microComponents/Title";
import Navbar from "../Navbar";
import Pagination from "../../microComponents/Pagination";
import HeaderComp from "./HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView"
import { columnDefs, dataOf } from "./OverallLeadsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


type ViewType = "list" | "kanban";


 const Contact=()=> {


  const [activeView, setActiveView] = useState<ViewType>("list");






  const rowData = Array.from({ length: 30 }, (_, index) => ({
    ...dataOf[0],
    id: index + 1
  }));
  const totalItems = rowData.length;

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
      <Navbar />

     
      <HeaderComp
        data={{
          title: "Lead",
          Listlogo: "viewList.svg",
          Kanbanlogo: "kanban.svg",
          
          searchText: "Search Leads..."
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
}


export default Contact;
