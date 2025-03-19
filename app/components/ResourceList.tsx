"use client";
import React, { useState, useCallback } from "react";
import Search from "../microComponents/Search";
import HeaderButtons from "../microComponents/HeaderButtons";
import { headerbutton, search } from "./Path/TaskData";
import ResourceContainer from "./ResourceList/ResourceContainer";
import { ResourceForm } from "./ResourceList/ResourceForm";
import Title from "../microComponents/Title";
import { Resourcetitle } from "./Path/TitlePaths";
import _ from "lodash";

const ResourceList = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState<string>("");

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      if (query.length >= 3 || query.length === 0) {
        setSearchQuery(query);
      }
    }, 500),
    []
  );

  const handleSearchChange = (query: string) => {
    setInputValue(query);

    if (query.length >= 3 || query.length === 0) {
      debouncedSearch(query);
    } else if (searchQuery && query.length < 3) {
      setSearchQuery("");
    }
  };

  const handleAddResource = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen w-full">
      {showForm && <ResourceForm onClose={handleCloseForm} />}

      <div className="w-full px-4 sm:px-6 lg:px-[70px] mt-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <Title title={Resourcetitle[0].titleName} />
            <div className="ml-5">
              <Search 
                searchText={search[0].searchText} 
                value={inputValue} 
                onChange={handleSearchChange} 
              />
            </div>
          </div>
          <div>
            <HeaderButtons
              button1Text={headerbutton[0].button1text}
              button1img={headerbutton[0].button1img}
              button2Text={headerbutton[0].button2text}
              button2img={headerbutton[0].button2img}
              button2width="w-[160px]"
              button2Action={handleAddResource}
            />
          </div>
        </div>
      </div>
      
      <ResourceContainer searchQuery={searchQuery} />
    </div>
  );
};

export default ResourceList;