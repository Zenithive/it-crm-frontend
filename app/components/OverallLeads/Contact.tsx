

"use client";
import { useState } from "react";
import Title from "../../microComponents/Title";
import Navbar from "../Navbar";
import Pagination from "../../microComponents/Pagination";
import HeaderComp from "../../microComponents/HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView"
import { dataOf, columnDefs } from "./data";




export default function Contact() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [activeView, setActiveView] = useState("list");





  const rowData = Array.from({ length: 50 }, (_, index) => ({
    ...dataOf[0],
    id: index + 1
  }));
  const totalItems = rowData.length;

  const handleSearchChange = (e) => {
    console.log("Search Input:", e.target.value);
  };

  const handleAddLead = () => {
    console.log("Add Lead clicked");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleViewChange = (view) => {
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
          List2logo: "kanban.svg",
          
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
          <KanbanView/>
        )}
      </div>
      
    </>
  );
}

{/* 
      <div className="flex justify-between items-center p-4 relative bott rounded-lg">
        <Pagination
          totalItems={totalItems}
          initialItemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      </div> */}