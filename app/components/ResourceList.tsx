import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search, nav } from "./Path/TaskData";
import ResourceContainer from "./ResourceList/ResourceContainer";
import { resourceListData } from "./Path/OverallCaseStudyData";

const ResourceList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9);
  return (
    <div className="min-h-screen w-full">
      <Navbar nav={nav[0]} />

      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <Search searchText={search[0].searchText} />
          </div>
          <div>
            <HeaderButtons
              button1Text={headerbutton[0].button1text}
              button1img={headerbutton[0].button1img}
              button2Text={headerbutton[0].button2text}
              button2img={headerbutton[0].button2img}
              button1width="w-[109px]"
              button2width="w-[160px]"
            />
          </div>
        </div>
      </div>
      <ResourceContainer
        resources={resourceListData}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        isResourceList={true}
      />
    </div>
  );
};

export default ResourceList;
