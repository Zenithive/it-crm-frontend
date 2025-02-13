"use client";
import { useState } from "react";
import Title from "../../microComponents/Title";
import Navbar from "../Navbar";
import Pagination from "../../microComponents/Pagination";
import HeaderComp from "../../microComponents/HeaderComp";

export default function Contact() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dataOf = [
    {
      name: "Sachin T",
      company: "TechCorp",
      stage: "New Lead",
      owner: "Zenithive",
      source: "Website",
      type: "Enterprise",
      campaign: "Xyz",
      profileImage: "profileLogo.svg",
    },
  ];

  const data = Array(50)
    .fill(dataOf)
    .map((item, index) => ({
      ...item,
      id: index + 1,
      name: "Sachin T",
      company: "TechCorp",
      stage: "New Lead",
      owner: "Zenithive",
      source: "Website",
      type: "Enterprise",
      campaign: "Xyz",
      profileImage: "profileLogo.svg",
    }));

  const totalItems = data.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search Input:", e.target.value);
  };

  const handleAddLead = () => {
    console.log("Add Lead clicked");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleViewChange = (view: string) => {
    console.log("View changed to:", view);
  };
  return (
    <>
      <Navbar />

      <HeaderComp
        data={{
          title: "Lead",
          Listlogo: "list.svg",
          List2logo: "list1.svg",
          List3logo: "list3.svg",
          searchText: "Search Leads...",
        }}
        onSearchChange={handleSearchChange}
        onAddLead={handleAddLead}
        onFilter={handleFilter}
        onViewChange={handleViewChange}
      />

      <div className="px-[70px]">
        <div className="flex flex-col gap-[10px] mt-[37px]">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-bg-blue-11">
              <thead>
                <tr className=" bg-bg-blue-11 text-white">
                  <th className="pl-[72px] font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Name</span>
                      <span>
                        <img src="rename.svg" alt="Filter Icon" />
                      </span>
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Company</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Stage</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Owner</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Source</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Type</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                  <th className="font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Campaign</span>
                      <img src="rename.svg" alt="Filter Icon" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr
                    className="hover:bg-gray-50 border-b border-bg-blue-11"
                    key={index}
                  >
                    <td className="pl-[45px]">
                      <div className="flex items-center gap-[5px]">
                        <img
                          src={row.profileImage}
                          alt="Profile"
                          className="w-[38px] h-[38px] rounded-[4px] "
                        />
                        {row.name}
                      </div>
                    </td>
                    <td className="p-4">{row.company}</td>
                    <td className="p-4">
                      <button className=" h-[28px] w-[114px] text-green-11 border-green-11 border rounded-md px-[8px] flex items-center justify-center">
                        {row.stage}
                      </button>
                    </td>
                    <td className="p-4">{row.owner}</td>
                    <td className="p-4">{row.source}</td>
                    <td className="p-4">{row.type}</td>
                    <td className="p-4 items-center justify-center flex">
                      {row.campaign}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 mt-[95px] rounded-lg">
          <Pagination
            totalItems={totalItems}
            initialItemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
}
