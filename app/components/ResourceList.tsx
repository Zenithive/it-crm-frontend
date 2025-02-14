import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import ResourceContainer from "./ResourceList/ResourceContainer";

const ResourceList = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

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
      <ResourceContainer></ResourceContainer>
    </div>
  );
};

export default ResourceList;
