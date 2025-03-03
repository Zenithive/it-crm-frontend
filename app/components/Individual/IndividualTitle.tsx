import React from "react";
import Title from "../../microComponents/Title";
import { Individualtitle } from "../Path/TitlePaths";
import IconButton from "../../microComponents/IconButton";
import HeaderFlag from "../../microComponents/HeaderFlag";

const IndividualTitle = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Title title={Individualtitle[0].titleName}></Title>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
            Qualified Lead
          </span>
        </div>
        <div className="flex items-center gap-4">
          <IconButton icon="edit_logo.svg" text="Edit Contact" />
          <HeaderFlag/>
        </div>
      </div>
    </div>
  );
};

export default IndividualTitle;
