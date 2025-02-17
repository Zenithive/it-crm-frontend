"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "../microComponents/Title";
import { OverallCaseStudytitle } from "./Path/TitlePaths";
import { headerbutton, search, nav } from "./Path/TaskData";
import HeaderButtons from "../microComponents/HeaderButtons";
import Search from "../microComponents/Search";
import Navbar from "./Navbar";
import ResourceContainer from "./ResourceList/ResourceContainer";
import { dynamicResources } from "./Path/OverallCaseStudyData";

const OverallCaseStudy = () => {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLayoutChange = () => {
    router.push("/tableviewoverallcase"); // Replace with your actual route
  };

  return (
    <div>
      <Navbar nav={nav[0]} />
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
              <button className="w-7 h-7">
                <img
                  src="/overallCaseStudy.svg"
                  alt="Overall View"
                  className="w-full h-full"
                />
              </button>
              <button onClick={handleLayoutChange} className="w-7 h-7">
                <img
                  src="/tabler_layout-list.svg"
                  alt="List View"
                  className="w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ResourceContainer
        resources={dynamicResources}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        isResourceList={false}
      />
    </div>
  );
};

export default OverallCaseStudy;
