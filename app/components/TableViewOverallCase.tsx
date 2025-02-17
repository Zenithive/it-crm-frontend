"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import ResourceContainer from "./ResourceList/ResourceContainer";
import { dynamicResources } from "./Path/OverallCaseStudyData";
import { OverallCaseStudytitle } from "./Path/TitlePaths";
import Title from "../microComponents/Title";
import TablerLayout from "./OverallCaseStudy/TablerLayout";

const TableViewOverallCase = () => {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLayoutChange = () => {
    router.push("/overallcasestudy"); // Replace with your actual route
  };

  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div className="">
            <Title title={OverallCaseStudytitle[0].titleName} />
          </div>
          <div className="">
            <HeaderButtons
              button1Text={headerbutton[1].button1text}
              button1img={headerbutton[1].button1img}
              button2Text={headerbutton[1].button2text}
              button2img={headerbutton[1].button2img}
              button1width="w-[109px]"
              button2width="w-[160px]"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <Search searchText={search[1].searchText} />

            <div className="flex space-x-4">
              <button onClick={handleLayoutChange} className="w-6 h-6">
                <img
                  src="/overallCaseStudy_2.svg"
                  alt="Overall View"
                  className="w-full h-full"
                />
              </button>
              <button className="w-7 h-7">
                <img
                  src="/tabler_layout-list_2.svg"
                  alt="List View"
                  className="w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <TablerLayout  resources={dynamicResources}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              isResourceList={false}></TablerLayout>
    </div>
  );
};

export default TableViewOverallCase;
