import React from "react";
import { useRouter } from "next/navigation";
import Title from "../../microComponents/Title";
import HeaderFlag from "../../microComponents/HeaderFlag";

interface DashboardTitleProps {
  Dashboardtitle: { titleName: string }[];
}

const Dashboard_Title: React.FC<DashboardTitleProps> = ({ Dashboardtitle }) => {
  const router = useRouter();

  const handleLeadClick = () => {
    router.push('/contact') 
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title title={Dashboardtitle[0].titleName} />

        <div className="flex items-center space-x-4">
          <HeaderFlag />
          <button className="lead_button" onClick={handleLeadClick} type="button">
            <img src="lead_icon.svg" alt="icon" className="p-2" />
            Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Title;
