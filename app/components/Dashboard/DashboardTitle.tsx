import React from "react";
import Title from "../../microComponents/Title";
import HeaderFlag from "../../microComponents/HeaderFlag";

const Dashboard_Title = ({ Dashboardtitle }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Title title={Dashboardtitle[0].titleName} />

        <div className="flex items-center space-x-4">
          <HeaderFlag/>
          <button className="lead_button">
            <img src="lead_icon.svg" alt="icon" className="p-2"></img>
            Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Title;
