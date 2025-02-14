

"use client";
import { useState } from "react";
import Title from "../../microComponents/Title";
import Navbar from "../Navbar";
import Pagination from "../../microComponents/Pagination";
import HeaderComp from "../../microComponents/HeaderComp";
import MicroTable from "../../microComponents/Tabel";
import KanbanView from "./KanbanView"




export default function Contact() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [activeView, setActiveView] = useState("list");

  const columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, cellRenderer: 'customCellRenderer',flex:1 },
    { headerName: 'Company', field: 'company', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer' },
    { headerName: 'Stage', field: 'stage', sortable: true, filter: true, cellRenderer: 'stageCellRenderer',flex:1 },
    { headerName: 'Owner', field: 'owner', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
    { headerName: 'Source', field: 'source', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
    { headerName: 'Type', field: 'type', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
    { headerName: 'Campaign', field: 'campaign', sortable: true, filter: true,flex:1 , cellRenderer: 'customCellRenderer' }
  ];

  const dataOf = [
    {
      name: 'Aryan K',
      company: 'TechCorp',
      stage: 'New Lead',
      // stage: 'Qualified',
      // stage: 'negotiator',
      owner: 'Zenithive',
      source: 'Website',
      type: 'Enterprise',
      campaign: 'Xyz',
      profileImage: 'profileLogo.svg'
    }
  ];

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